import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'custom-slides-top',
    templateUrl: './custom-slides-top.component.html',
    styleUrls: ['./custom-slides-top.component.scss'],
})
export class CustomSlidesTopComponent implements OnInit {
    @Input() list: Array<any>;
    option = {
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 2,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    };

    constructor() {
    }

    ngOnInit() {
    }

}
