import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'custom-skeleton-slides-new',
    templateUrl: './custom-skeleton-slides-new.component.html',
    styleUrls: ['./custom-skeleton-slides-new.component.scss'],
})
export class CustomSkeletonSlidesNewComponent implements OnInit {
    list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    option = {
        slidesPerView: 3,
        spaceBetween: 5,
    };

    constructor() {
    }

    ngOnInit() {
    }

}
