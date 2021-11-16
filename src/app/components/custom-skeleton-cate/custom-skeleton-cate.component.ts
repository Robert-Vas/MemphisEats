import {Component} from '@angular/core';

@Component({
    selector: 'custom-skeleton-cate',
    templateUrl: './custom-skeleton-cate.component.html',
    styleUrls: ['./custom-skeleton-cate.component.scss'],
})
export class CustomSkeletonCateComponent {
    selectedCate = 1;
    cateList = [1, 2, 3, 4, 5, 6];
    constructor() {
    }
}
