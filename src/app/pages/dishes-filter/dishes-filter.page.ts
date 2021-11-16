import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FModel, CategoriesModel} from '../../shared/model';
import {CategoriesService} from '../../shared/fapi';
import {ModalController} from '@ionic/angular';
import {PageDataService} from '../../shared';

@Component({
    selector: 'app-dishes-filter',
    templateUrl: './dishes-filter.page.html',
    styleUrls: ['./dishes-filter.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DishesFilterPage implements OnInit {
    cateList: Array<CategoriesModel>;
    min: string;
    max: string;

    constructor(private categoriesService: CategoriesService,
                private pageService: PageDataService,
                public modalCtrl: ModalController) {
    }

    ngOnInit() {
        this.pageService.getSingleList(this.categoriesService).then(result => {
            this.cateList = result;
            this.cateList = this.cateList.map(c => new CategoriesModel({state: false, ...c}));
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
