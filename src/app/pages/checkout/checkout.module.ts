import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { CustomSuccessModalComponent } from "../../components/custom-success-modal/custom-success-modal.component";
import { SelectCreditCardModal } from "../select-credit-card/select-credit-card.component";
import { CheckoutPage } from "./checkout.page";

const routes: Routes = [
    {
        path: '',
        component: CheckoutPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        CheckoutPage,
        SelectCreditCardModal,
        CustomSuccessModalComponent
    ],
    providers: [DatePipe],
    entryComponents: [
        SelectCreditCardModal,
        CustomSuccessModalComponent
    ]
})
export class CheckoutPageModule {}