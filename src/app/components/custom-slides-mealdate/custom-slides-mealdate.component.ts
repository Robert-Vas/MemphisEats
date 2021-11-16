import {Component, Input} from '@angular/core';
import {DishesModel} from '../../shared/model';

@Component({
    selector: 'custom-slides-mealdate',
    templateUrl: './custom-slides-mealdate.component.html',
    styleUrls: ['./custom-slides-mealdate.component.scss']
})
export class CustomSlidesMealDateComponent {
    @Input() list: Array<DishesModel>;
    @Input() date: string;
    
    option = {
        slidesPerView: 2,
        spaceBetween: 4,
        freeMode: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        }
    };
    constructor() {
    }

}
