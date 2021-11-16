import {Component, Input, OnInit} from '@angular/core';
import {GoodsModel} from '../../shared/model';

@Component({
    selector: 'custom-guess',
    templateUrl: './custom-guess.component.html',
    styleUrls: ['./custom-guess.component.scss'],
})
export class CustomGuessComponent implements OnInit {
    @Input() list: Array<GoodsModel>;
    defaultSubCate = 1;
    subGoodList: Array<GoodsModel>;
    subCateList = [
        {id: 1, name: 'Hot'},
        {id: 2, name: 'New'},
        {id: 3, name: 'Top'}
    ];

    constructor() {
    }

    changed(event) {
        this.subGoodList = this.list.sort(() => Math.random() - 0.5).slice(0, 6);
    }

    ngOnInit(): void {
        this.subGoodList = this.list.sort(() => Math.random() - 0.5).slice(0, 6);
    }
}
