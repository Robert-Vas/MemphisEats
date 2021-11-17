import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ScrollDetail} from '@ionic/core';
import {IonContent} from '@ionic/angular';
import {AuthService, DishesService, OrderDetailService, OrderService} from '../../shared/fapi';
import {Order, PaymentSummary, UserModel} from '../../shared/model';
import {ActivatedRoute} from '@angular/router';
import {AlertProvider, AnimationProvider} from '../../shared';
import {SessionStorage} from 'ngx-store';
import { combineLatest, Observable, Subscription, zip } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
    selector: 'app-order',
    templateUrl: './order.page.html',
    styleUrls: ['./order.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OrderPage implements OnInit, OnDestroy {
    @SessionStorage() user: UserModel;
    @ViewChild(IonContent, {static: true}) content: IonContent;
    selectType = 'All';
    orderList: any[];
    gList: any[];
    dishImgMap: {[id: string]: string};
    isEnd = false;
    isLoading = true;
    isActive = false;
    sub: Subscription;
    segmentOrderList: any[];


    constructor(
        private alertProvider: AlertProvider,
        private orderService: OrderService,
        private dishService: DishesService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private aProvider: AnimationProvider) {
    }
    ngOnDestroy(): void {
        if (this.sub != null){
            this.sub.unsubscribe();
        }
    }

    ngOnInit() {
    }

    async getList() {
        this.orderList = null;
        if (this.authService.isAuthenticated) {
            this.selectType = this.route.snapshot.paramMap.get('state') || 'All';
            this.sub = combineLatest([
                this.orderService.getOrderList(this.user.uid),
                this.dishService.getFullList()
            ]).subscribe(([orders, dishes]) => {
                this.orderList = this.gList = orders;
                this.dishImgMap = dishes.map(dish => [dish.id, dish.img])
                    .reduce((obj, [id, img]) => {
                        obj[id] = img;
                        return obj;
                    }, {});
                this.isLoading = false;
            }, error => this.alertProvider.present(error));
        }
        
    }

    ionViewDidEnter() {
        this.getList();
    }

    segmentChanged(event) {
        this.segmentOrderList = []
        this.selectType = event.detail.value
        this.filterOrderList()

    }

    animation(i) {
        return this.aProvider.trackingInExpand(i);
    }

    onScroll($event: CustomEvent<ScrollDetail>) {
        if ($event && $event.detail && $event.detail.scrollTop) {
            const scrollTop = $event.detail.scrollTop;
            this.isEnd = scrollTop >= 10;
            this.isActive = scrollTop >= 79;
        }
    }

    goTop() {
        this.content.scrollToTop(2000);
    }

    getStatusColor(status: string) {
        switch (status) {
            case 'finish':
                return 'success';
            case 'cancel':
                return 'danger';
            case 'delivery':
                return 'warning';
            case 'process':
                return 'twitter';
            default:
                return 'twitter';
        }
    }

    getTotal(summary: PaymentSummary): number {
        return summary.subtotal - summary.discount + summary.tax;
    }

    getThumbnail(order: Order): string {
        const firstDishId = Object.keys(order.orderedDishes)[0];
        return this.dishImgMap[firstDishId];
    }

    filterOrderList(){

        this.orderList.forEach(order => {
            if (order.status == this.selectType) this.segmentOrderList.push(order)     
        });
        
    }
}
