import {Component, Input} from '@angular/core';

@Component({
    selector: 'custom-skeleton-home-memphiseats',
    templateUrl: './custom-skeleton-home-memphiseats.component.html',
    styleUrls: ['./custom-skeleton-home-memphiseats.component.scss'],
})
export class CustomSkeletonHomeMemphisEatsComponent {
    menuList = [
        {name: 'new', background: '#2ad2c9', img: 'assets/img/home/notice.png', url: '/pages/notice'},
        {name: 'Coupon', background: '#FF9545', img: 'assets/img/home/gift.png', url: '/pages/coupon-list'},
        {name: 'favorite', background: '#ff585d', img: 'assets/img/home/invite.png', url: '/pages/favorite-list'},
        {name: 'fruit', background: '#aec95f', img: 'assets/img/home/fruit.png', url: '/pages/goods-list/all'},
    ];
    defaultSubCate = 1;
    subCateList = [
        {id: 1, name: 'Hot'},
        {id: 2, name: 'New'},
        {id: 3, name: 'Top'}
    ];
    img = 'assets/img/home/hot.jpg';
    list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    option = {
        slidesPerView: 3,
        spaceBetween: 5,
        freeMode: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        }
    };
    segList = [1, 2, 3, 4, 5, 6];

    constructor() {
    }


}
