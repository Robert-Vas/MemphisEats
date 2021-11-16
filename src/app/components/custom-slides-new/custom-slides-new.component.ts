import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'custom-slides-new',
    templateUrl: './custom-slides-new.component.html',
    styleUrls: ['./custom-slides-new.component.scss'],
})
export class CustomSlidesNewComponent implements OnInit {
    @Input() list: Array<any>;
    option = {
        slidesPerView: 3,
        spaceBetween: 5,
        slidesPerColumn: 2,
    };

    constructor() {
    }

    ngOnInit() {
    }

}
