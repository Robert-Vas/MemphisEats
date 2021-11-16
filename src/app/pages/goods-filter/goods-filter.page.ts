import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FModel, SubCateModel} from '../../shared/model';
import {SubCateService} from '../../shared/fapi';
import {ModalController} from '@ionic/angular';
import {PageDataService} from '../../shared';

@Component({
    selector: 'app-goods-filter',
    templateUrl: './goods-filter.page.html',
    styleUrls: ['./goods-filter.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GoodsFilterPage implements OnInit {
    cateList: Array<SubCateModel>;
    min: string;
    max: string;

    constructor(private subCateService: SubCateService,
                private pageService: PageDataService,
                public modalCtrl: ModalController) {
    }

    ngOnInit() {
        this.pageService.getSingleList(this.subCateService).then(result => {
            this.cateList = result;
            this.cateList = this.cateList.map(c => new SubCateModel({state: false, ...c}));
        });
    }


    onCheckCate(id: string) {
        this.cateList.map(f => {
            if (f.id === id) {
                f.checked = !f.checked;
            }
        });
    }

    dismiss() {
        this.modalCtrl.dismiss(new FModel());
    }

    onFilter() {
        const list = this.cateList.filter(f => f.checked).map(c => c.id);
        const fmodel = new FModel({min: this.min, max: this.max});
        fmodel.list = list;
        this.modalCtrl.dismiss(fmodel);
    }

}
