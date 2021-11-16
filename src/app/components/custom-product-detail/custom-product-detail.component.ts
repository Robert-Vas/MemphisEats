import {Component, Input, OnInit} from '@angular/core';
import {GoodPhotoModel, GoodsModel} from '../../shared/model';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'custom-product-detail',
    templateUrl: './custom-product-detail.component.html',
    styleUrls: ['./custom-product-detail.component.scss'],
})
export class CustomProductDetailComponent implements OnInit {
    @Input() photoList: Array<GoodPhotoModel> = [];
    @Input() detail: GoodsModel;

    constructor(public sanitizer: DomSanitizer) {
    }

    ngOnInit() {
    }
}
