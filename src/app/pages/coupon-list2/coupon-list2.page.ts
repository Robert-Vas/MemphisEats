import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-coupon-list2',
    templateUrl: './coupon-list2.page.html',
    styleUrls: ['./coupon-list2.page.scss'],
})
export class CouponList2Page implements OnInit {
    list = [
        {
            img: 'assets/img/my/1.jpg',
            title: '20% off Apple',
            stars: 5,
            active: false,
            reviews: '7.17 (121 reviews)',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
        },
        {
            img: 'assets/img/my/2.jpg',
            title: '30% off Apple',
            stars: 4,
            active: false,
            reviews: '8.15 (33 reviews)',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
        },
        {
            img: 'assets/img/my/3.jpg',
            title: '50% off Apple',
            stars: 3,
            active: false,
            reviews: '9.12 (67 reviews)',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
        }
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
