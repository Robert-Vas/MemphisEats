import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, NavParams } from "@ionic/angular";
import { PaymentType } from "../../shared";

export interface CreditPayment {
  type: PaymentType.Credit;
  data: {
    number: string;
    expMonth: number;
    expYear: number;
    cvc: string;
  };
}
export interface PayPalPayment {
  type: PaymentType.PayPal;
}
export interface CashPayment {
  type: PaymentType.Cash;
}
export type Payment = CreditPayment | PayPalPayment | CashPayment;

@Component({
  selector: "app-select-credit-card",
  templateUrl: "./select-credit-card.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class SelectCreditCardModal implements OnInit {
  paymentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    const payment: Payment = this.navParams.get("payment") || {
      type: PaymentType.Credit,
      data: {
        number: "",
        expMonth: "",
        expYear: "",
        cvc: "",
      },
    };

    this.paymentForm = this.formBuilder.group({
      number: [
        payment.type === PaymentType.Credit && payment.data.number,
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
        ],
      ],
      expMonth: [
        payment.type === PaymentType.Credit && payment.data.expMonth,
        [Validators.required, Validators.maxLength(2)],
      ],
      expYear: [
        payment.type === PaymentType.Credit && payment.data.expYear,
        Validators.required,
      ],
      cvc: [
        payment.type === PaymentType.Credit && payment.data.cvc,
        [Validators.required, Validators.maxLength(3), Validators.minLength(3)],
      ],
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  finishSelection() {
    const payment: Payment = {
      type: PaymentType.Credit,
      data: this.paymentForm.value,
    };
    this.modalController.dismiss(payment);
  }
}
