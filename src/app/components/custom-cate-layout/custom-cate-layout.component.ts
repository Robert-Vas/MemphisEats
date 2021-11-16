import {Component, Input, OnInit} from '@angular/core';
import {CateModel, CateRelationModel, SubCateModel, SubCateRelationViewModel} from '../../shared/model';
import {AnimationProvider} from '../../shared/providers';
import {CateRelationService, CateService, SubCateService} from '../../shared/fapi';
import {PageDataService} from '../../shared';

@Component({
    selector: 'custom-cate-layout',
    templateUrl: './custom-cate-layout.component.html',
    styleUrls: ['./custom-cate-layout.component.scss'],
})
export class CustomCateLayoutComponent implements OnInit {
    isLoading = true;
    selectedCate: string;
    cateList: Array<CateModel>;
    subList: Array<SubCateModel>;
    relationList: Array<CateRelationModel>;
    gList: Array<SubCateRelationViewModel>;

    constructor(private cateService: CateService,
                private subCateService: SubCateService,
                private cRelationService: CateRelationService,
                private pageService: PageDataService,
                private animationProvider: AnimationProvider
    ) {
    }

    ngOnInit() {
        this.getList();
    }

    getList() {
        const list: Array<any> = [this.cateService.getList(), this.subCateService.getList(),
            this.cRelationService.getList()];
        this.pageService.getList1(list).then(r => {
            this.cateList = r[0];
            this.cateList = this.cateList.sort((a, b) => a.sort - b.sort);
            this.selectedCate = this.cateList[0].id;
            this.subList = r[1];
            this.relationList = r[2];
            this.gList = this.relationList.map(rl => {
                const sub = this.subList.find(s => s.id === rl.subCateId);
                return new SubCateRelationViewModel({cateId: rl.cateId, ...sub});
            });
            this.gList = this.gList.filter(g => g.name !== undefined);
            this.subList = this.gList.filter(g => g.cateId === this.selectedCate);
            this.isLoading = false;
        });
    }

    onSelect(cateId) {
        this.selectedCate = cateId;
        this.subList = this.gList.filter(g => g.cateId === cateId);
    }

    animation(i) {
        return this.animationProvider.flipInTop(i);
    }

}
