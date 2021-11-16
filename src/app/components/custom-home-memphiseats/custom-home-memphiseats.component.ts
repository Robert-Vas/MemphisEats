import {Component, Input, ViewEncapsulation} from '@angular/core';
import {MealsModel, DishesModel, BannerModel, GoodsModel, NoticeModel, SubCateModel} from '../../shared/model';
import {AnimationProvider} from '../../shared';
import {ModalController} from '@ionic/angular';
import {CustomNoticeSlideComponent} from '../custom-notice-slide/custom-notice-slide.component';

@Component({
    selector: 'custom-home-memphiseats',
    templateUrl: './custom-home-memphiseats.component.html',
    styleUrls: ['./custom-home-memphiseats.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CustomHomeMemphisEatsComponent {
    @Input() mealList: Array<any>;
    @Input() bannerList: Array<BannerModel>;
    @Input() notice = 'Get coupon code: Get $5 Flat Rate Shipping On Select fruit Products';
    @Input() goodList: Array<GoodsModel>;
    @Input() hotList: Array<GoodsModel>;
    @Input() subCateList: Array<SubCateModel>;
    @Input() defaultSubCate: string;
    @Input() noticeList: Array<NoticeModel>;
    @Input() newList: Array<GoodsModel>;

    menuList = [
        {name: 'Notice', background: '#2ad2c9', img: 'assets/img/home/notice.png', url: '/pages/notice'},
        {name: 'Coupon', background: '#0bcea6', img: 'assets/img/home/gift.png', url: '/pages/coupon-list'},
        {name: 'Favorite', background: '#ff585d', img: 'assets/img/home/invite.png', url: '/pages/favorite-list'},
        {name: 'Fruit', background: '#aec95f', img: 'assets/img/home/fruit.png', url: '/pages/goods-list/all'},
    ];

    constructor(private aProvider: AnimationProvider,
                public modalCtrl: ModalController) {
    }

    animation(i) {
        return this.aProvider.flipInRight(i);
    }

    async onNotice() {
        const modal = await this.modalCtrl.create({
            component: CustomNoticeSlideComponent,
            cssClass: 'notice-modal',
        });
        await modal.present();
    }

}
