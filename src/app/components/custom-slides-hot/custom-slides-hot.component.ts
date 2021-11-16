import {Component, Input} from '@angular/core';

@Component({
    selector: 'custom-slides-hot',
    templateUrl: './custom-slides-hot.component.html',
    styleUrls: ['./custom-slides-hot.component.scss']
})
export class CustomSlidesHotComponent {
    img = 'assets/img/home/hot.jpg';
    @Input() list: Array<any>;
    option = {
        slidesPerView: 3,
        spaceBetween: 5,
        freeMode: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        }
    };
    constructor() {
    }

}
