import {Component} from '@angular/core';

@Component({
    selector: 'custom-skeleton-order',
    templateUrl: './custom-skeleton-order.component.html',
    styleUrls: ['./custom-skeleton-order.component.scss'],
})
export class CustomSkeletonOrderComponent {
    list = [1, 2, 3, 4, 5, 6];

    constructor() {
    }
}
