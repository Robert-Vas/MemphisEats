import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { DishDetailPage } from "./dish-detail.page";
import { ComponentsModule } from "../../components/components.module";
import { StepperModule } from "ng-zorro-antd-mobile";

const routes: Routes = [
  {
    path: "",
    component: DishDetailPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StepperModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
  declarations: [DishDetailPage],
})
export class DishDetailPageModule {}
