import { Component, OnDestroy, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { SessionStorage } from "ngx-store";
import { combineLatest, Observable, Subscription } from "rxjs";
import { map, scan, take } from "rxjs/operators";
import { CustomSuccessModalComponent } from "../../components/custom-success-modal/custom-success-modal.component";
import { environment } from "../../../environments/environment";
import { PushNotificationsPickupService } from "../../shared/fapi/push-notifications-pickup.service";
import { FcmService } from "../../shared/api/fcm.service";
import {
  CartDataService,
  CartModel,
  DeliveryMethod,
  LocationsModel,
  LocationsService,
  Order,
  OrderedDishDetails,
  OrderService,
  OrderStatus,
  PaymentSummary,
  PaymentType,
  UserModel,
} from "../../shared";
import {
  Payment,
  SelectCreditCardModal,
} from "../select-credit-card/select-credit-card.component";
import { Plugins } from "@capacitor/core";
import "@capacitor-community/stripe";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { PushNotificationsPickup } from "../../shared/model/push-notifications-pickup.model";
import * as moment from "moment";
import { Capacitor } from "@capacitor/core";

// get Stripe Capacitor plugin
const { Stripe } = Plugins;
// set Stripe publishable key
Stripe.setPublishableKey({
  key: environment.key.publishableKey,
});

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.page.html",
  styleUrls: ["./checkout.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CheckoutPage implements OnDestroy {
  @SessionStorage() user: UserModel;
  cart$: Observable<CartModel[]>;
  locations$: Observable<LocationsModel[]>;
  payment: Payment = null;
  pickupLocation: LocationsModel = null;
  sub: Subscription;

  constructor(
    private cartService: CartDataService,
    private modalController: ModalController,
    private orderService: OrderService,
    private locationsService: LocationsService,
    private pushNotificationsPickupService: PushNotificationsPickupService,
    private fcmService: FcmService,
    private router: Router,
    private http: HttpClient
  ) {
    this.cart$ = this.cartService.cart$;
    this.locations$ = this.locationsService.getList();
  }

  get paymentSummary$(): Observable<PaymentSummary> {
    return this.cartService.cart$.pipe(
      scan<CartModel[], number>(
        (acc, currentValue) =>
          acc + currentValue.reduce((prev, curr) => prev + curr.price * curr.num, 0),
        0
      ),
      map((value) => {
        // todo: get discounts
        const discounts = 0;

        return {
          subtotal: value,
          discount: discounts,
          tax: this.pickupLocation
            ? (value - discounts) * this.pickupLocation.salesTax
            : NaN,
        };
      })
    );
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  async changePayment(type: PaymentType) {
    if (type !== PaymentType.Credit) {
      // todo: change this when implementing other types of payment
      return;
    }

    const modal = await this.modalController.create({
      component: SelectCreditCardModal,
      componentProps: {
        payment: this.payment,
      },
    });
    await modal.present();
    const detail = await modal.onWillDismiss();
    if (detail.data) {
      this.payment = detail.data;
    }
  }
  
  compareLocations(loc1: LocationsModel, loc2: LocationsModel) {
    return loc1 && loc2 ? loc1.id === loc2.id : loc1 === loc2;
  }

  async placeOrder() {
    const rightNow = new Date();
    // the following is probably really bad code, and I'm sorry
    this.sub = combineLatest([this.cart$, this.paymentSummary$])
      .pipe(take(1))
      .subscribe(async ([cart, summary]) => {
        const order: Order = {
          userId: this.user.uid,
          createdOn: rightNow.toJSON(),
          paymentType: this.payment.type,
          status: OrderStatus.Start,
          deliveryType: DeliveryMethod.Pickup,
          locationId: this.pickupLocation.id,
          orderedDishes: cart.reduce(
            (acc, { id, price, readyOn, num }) => ({
              ...acc,
              [id]: { price, readyOn, count: num },
            }),
            {} as { [k: string]: OrderedDishDetails }
          ),
          paymentSummary: summary,
        };

        // handle charging payment methods
        if (this.payment.type == PaymentType.Credit) {
          // create a card token with Stripe, allowing a one-time payment
          const token = await Stripe.createCardToken({
            number: this.payment.data.number,
            exp_month: this.payment.data.expMonth,
            exp_year: this.payment.data.expYear,
            cvc: this.payment.data.cvc,
          });
          
          // ping the Firebase Function responsible for actually placing charges
          // requires the following environment variable to be defined
          // and also the function to be published/online
          // view this doc for details on response data: https://stripe.com/docs/api/charges/create
          const res = await this.http.post(environment.firebase.function, {
            amount: Math.ceil((summary.subtotal - summary.discount + summary.tax) * 100),
            currency: "usd",
            token: token.id
          }).toPromise<any>();
          order.paymentId = res.id;
        }

        await this.orderService.addModel(order);
        const modal = await this.modalController.create({
          component: CustomSuccessModalComponent,
        });
        await modal.present();

        // Tested with simulator before process payment code since stripe did not work on simulator
        // todo: need to change date to pickup date, right now there's no pickup date in order database 
        if (Capacitor.platform !== 'web') {
          const currDate: string = await moment(new Date()).format("YYYY-MM-DD");
          const pushNotificationsPickup: PushNotificationsPickup = {
            token: this.fcmService.deviceToken,
            date: currDate
          };
          await this.pushNotificationsPickupService.addModel(pushNotificationsPickup);
        }

        /* uncomment this and fix when discounts are back:
        if (this.discountModel) {
            const myCoupon = new MyCouponModel();
            myCoupon.couponId = this.discountModel.couponId;
            myCoupon.userId = this.user.uid;
            myCoupon.isUsed = true;
            myCoupon.isExpire = false;
            myCoupon.id = this.discountModel.myId;
            addArr.push(this.myCouponService.update(myCoupon));
        } */
        // this.user.balance = +(this.user.balance - order.paymentSummary.subTotal).toFixed(2);
        // await this.userService.update(this.user);
        this.cartService.clear();
        modal.dismiss().then(() => this.router.navigateByUrl("/tabs/my"));
      });
  }
}
