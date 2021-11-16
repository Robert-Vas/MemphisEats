import {Component} from '@angular/core';

@Component({
    selector: 'custom-skeleton-list',
    templateUrl: './custom-skeleton-list.component.html',
    styleUrls: ['./custom-skeleton-list.component.scss'],
})
export class CustomSkeletonListComponent  {
    list = [1, 2, 3, 4, 5, 6, 7, 8];

    constructor() {
    }

}
