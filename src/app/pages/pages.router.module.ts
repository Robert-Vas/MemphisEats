import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared";

const routes: Routes = [
  {
    path: "dishes-list/:cateId",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("../pages/dishes-list/dishes-list.module").then(
            (m) => m.DishesListPageModule
          ),
      },
    ],
  },
  {
    path: "dish-detail/:id",
    loadChildren: () =>
      import("./dish-detail/dish-detail.module").then(
        (m) => m.DishDetailPageModule
      ),
  },
  {
    path: "coupon/:id",
    loadChildren: () =>
      import("../pages/coupon/coupon.module").then((m) => m.CouponPageModule),
  },
  {
    path: "checkout",
    loadChildren: () =>
      import("../pages/checkout/checkout.module").then(
        (m) => m.CheckoutPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "my-address",
    loadChildren: () =>
      import("../pages/my-address/my-address.module").then(
        (m) => m.MyAddressPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "order/:state",
    loadChildren: () =>
      import("../pages/order/order.module").then((m) => m.OrderPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "address-list",
    loadChildren: () =>
      import("../pages/address-list/address-list.module").then(
        (m) => m.AddressListPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "card",
    loadChildren: () =>
      import("../pages/card/card.module").then((m) => m.CardPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "notice",
    loadChildren: () =>
      import("../pages/notice/notice.module").then((m) => m.NoticePageModule),
  },
  {
    path: "favorite-list",
    loadChildren: () =>
      import("../pages/favorite-list/favorite-list.module").then(
        (m) => m.FavoriteListPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "coupon-list",
    loadChildren: () =>
      import("../pages/coupon-list/coupon-list.module").then(
        (m) => m.CouponListPageModule
      ),
  },
  {
    path: "order-detail/:id",
    loadChildren: () =>
      import("../pages/order-detail/order-detail.module").then(
        (m) => m.OrderDetailPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "statistics",
    loadChildren: () =>
      import("../pages/statistics/statistics.module").then(
        (m) => m.StatisticsPageModule
      ),
  },
  {
    path: "coupon-list2",
    loadChildren: () =>
      import("../pages/coupon-list2/coupon-list2.module").then(
        (m) => m.CouponList2PageModule
      ),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("../pages/profile/profile.module").then(
        (m) => m.ProfilePageModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
