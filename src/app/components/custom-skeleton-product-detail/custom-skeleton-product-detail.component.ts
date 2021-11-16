import {Component} from '@angular/core';

@Component({
    selector: 'custom-skeleton-product-detail',
    templateUrl: './custom-skeleton-product-detail.component.html',
    styleUrls: ['./custom-skeleton-product-detail.component.scss'],
})
export class CustomSkeletonProductDetailComponent {
    tList = Array.from({length: 15}, (v, i) => i);

    constructor() {
    }

}
