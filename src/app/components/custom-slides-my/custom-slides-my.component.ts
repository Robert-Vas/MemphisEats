import {Component} from '@angular/core';

@Component({
    selector: 'custom-slides-my',
    templateUrl: './custom-slides-my.component.html',
    styleUrls: ['./custom-slides-my.component.scss'],
})
export class CustomSlidesMyComponent {
    options = {
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        }
    };
    list = [
        'assets/img/my/b1.jpg',
        'assets/img/my/b2.jpg',
        'assets/img/my/b1.jpg',
    ];

    constructor() {
    }
}
