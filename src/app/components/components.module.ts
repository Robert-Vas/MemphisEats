import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {CustomSlidesFullComponent} from './custom-slides-full/custom-slides-full.component';
import {CustomSlidesAnimationComponent} from './custom-slides-animation/custom-slides-animation.component';
import {CustomHomeLayoutComponent} from './custom-home-layout/custom-home-layout.component';
import {CustomHomeMemphisEatsComponent} from './custom-home-memphiseats/custom-home-memphiseats.component';
import {CustomNoticeComponent} from './custom-notice/custom-notice.component';
import {NoticeBarModule} from 'ng-zorro-antd-mobile';
import {CustomSlidesHotComponent} from './custom-slides-hot/custom-slides-hot.component';
import {CustomGuessComponent} from './custom-guess/custom-guess.component';
import {FormsModule} from '@angular/forms';
import {CustomNoticeSlideComponent} from './custom-notice-slide/custom-notice-slide.component';
import {CustomSkeletonImgComponent} from './custom-skeleton-img/custom-skeleton-img.component';
import {CustomSkeletonHomeComponent} from './custom-skeleton-home/custom-skeleton-home.component';
import {CustomCateLayoutComponent} from './custom-cate-layout/custom-cate-layout.component';
import {CustomSkeletonCateComponent} from './custom-skeleton-cate/custom-skeleton-cate.component';
import {CustomSkeletonOrderComponent} from './custom-skeleton-order/custom-skeleton-order.component';
import {CustomAddressListComponent} from './custom-address-list/custom-address-list.component';
import {CustomSkeletonAddressListComponent} from './custom-skeleton-address-list/custom-skeleton-address-list.component';
import {CustomSlidesMyComponent} from './custom-slides-my/custom-slides-my.component';
import {CustomTimelineComponent} from './custom-timeline/custom-timeline.component';
import {CustomSkeletonListComponent} from './custom-skeleton-list/custom-skeleton-list.component';
import {CustomBarChartComponent} from './custom-bar-chart/custom-bar-chart.component';
import {ChartsModule} from 'ng2-charts';
import {CustomLineChartComponent} from './custom-line-chart/custom-line-chart.component';
import {CustomPieChartComponent} from './custom-pie-chart/custom-pie-chart.component';
import {CustomDoughnutChartComponent} from './custom-doughnut-chart/custom-doughnut-chart.component';
import {CustomSlidesNewComponent} from './custom-slides-new/custom-slides-new.component';
import {CustomSkeletonSlidesNewComponent} from './custom-skeleton-slides-new/custom-skeleton-slides-new.component';
import {CustomGoogleCardBottomComponent} from './custom-google-card-bottom/custom-google-card-bottom.component';
import {CustomCouponList2Component} from './custom-coupon-list2/custom-coupon-list2.component';
import {CustomSlidesTopComponent} from './custom-slides-top/custom-slides-top.component';
import {CustomSlidesMealDateComponent} from './custom-slides-mealdate/custom-slides-mealdate.component';
import {CustomProductDetailComponent} from './custom-product-detail/custom-product-detail.component';
import {CustomSkeletonProductDetailComponent} from './custom-skeleton-product-detail/custom-skeleton-product-detail.component';
import {CustomOkComponent} from './custom-ok/custom-ok.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule.forRoot(),
        RouterModule,
        NoticeBarModule,
        FormsModule,
        ChartsModule,
    ],
    declarations: [
        CustomSlidesFullComponent,
        CustomSlidesAnimationComponent,
        CustomHomeLayoutComponent,
        CustomNoticeComponent,
        CustomSlidesHotComponent,
        CustomGuessComponent,
        CustomNoticeSlideComponent,
        CustomSkeletonImgComponent,
        CustomSkeletonHomeComponent,
        CustomCateLayoutComponent,
        CustomSkeletonCateComponent,
        CustomSkeletonOrderComponent,
        CustomAddressListComponent,
        CustomSkeletonAddressListComponent,
        CustomSlidesMyComponent,
        CustomTimelineComponent,
        CustomSkeletonListComponent,
        CustomBarChartComponent,
        CustomLineChartComponent,
        CustomPieChartComponent,
        CustomDoughnutChartComponent,
        CustomSlidesNewComponent,
        CustomSkeletonSlidesNewComponent,
        CustomGoogleCardBottomComponent,
        CustomCouponList2Component,
        CustomSlidesTopComponent,
        CustomProductDetailComponent,
        CustomSkeletonProductDetailComponent,
        CustomSlidesMealDateComponent,
        CustomHomeMemphisEatsComponent,
        CustomOkComponent
    ],
    exports: [
        CustomSlidesFullComponent,
        CustomSlidesAnimationComponent,
        CustomHomeLayoutComponent,
        CustomNoticeComponent,
        CustomSlidesHotComponent,
        CustomGuessComponent,
        CustomNoticeSlideComponent,
        CustomSkeletonImgComponent,
        CustomSkeletonHomeComponent,
        CustomCateLayoutComponent,
        CustomSkeletonCateComponent,
        CustomSkeletonOrderComponent,
        CustomAddressListComponent,
        CustomSkeletonAddressListComponent,
        CustomSlidesMyComponent,
        CustomTimelineComponent,
        CustomSkeletonListComponent,
        CustomBarChartComponent,
        CustomLineChartComponent,
        CustomPieChartComponent,
        CustomDoughnutChartComponent,
        CustomSlidesNewComponent,
        CustomSkeletonSlidesNewComponent,
        CustomGoogleCardBottomComponent,
        CustomCouponList2Component,
        CustomSlidesTopComponent,
        CustomProductDetailComponent,
        CustomSkeletonProductDetailComponent,
        CustomSlidesMealDateComponent,
        CustomHomeMemphisEatsComponent,
        CustomOkComponent
    ],
    entryComponents: [CustomNoticeSlideComponent],
})
export class ComponentsModule {
}
