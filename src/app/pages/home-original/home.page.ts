import {Component, OnInit} from '@angular/core';
import {BannerModel, CateModel, GoodsModel, NoticeModel, SubCateModel} from '../../shared/model';
import {Events} from '@ionic/angular';
import {Router} from '@angular/router';
import {
    PageDataService,
    BannerService,
    CateService,
    CouponsService,
    GoodsService,
    SubCateService,
    NoticeService,
    AuthService
} from '../../shared';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
    isLoading = true;
    bannerList: Array<BannerModel>;
    notice = 'Get coupon code: Get $5 Flat Rate Shipping On Select fruit Products';
    cateList: Array<CateModel>;
    goodList: Array<GoodsModel>;
    hotList: Array<GoodsModel>;
    subGoodList: Array<GoodsModel>;
    subCateList: Array<SubCateModel>;
    noticeList: Array<NoticeModel>;
    newList: Array<GoodsModel>;
    defaultSubCate: string;
    constructor(private bannerService: BannerService,
                private cateService: CateService,
                private subCateService: SubCateService,
                private goodService: GoodsService,
                private couponService: CouponsService,
                private noticeService: NoticeService,
                private router: Router,
                private events: Events,
                public authService: AuthService,
                private pageService: PageDataService) {

    }

    ngOnInit() {
        this.getList();
    }

    getList() {
        const list: Array<any> = [this.bannerService.getList(), this.cateService.getList(),
            this.goodService.getList(), this.subCateService.getList(), this.noticeService.getList()];
        this.pageService.getList1(list).then(r => {
            this.bannerList = r[0];
            this.cateList = r[1];
            this.goodList = r[2];
            this.subCateList = r[3];
            this.noticeList = r[4];
            this.notice = this.noticeList.map(n => n.description).reduce((p, c) => p + c, '');
            this.subCateList = this.subCateList.sort((a, b) => a.sort - b.sort);
            this.subCateList = this.subCateList.slice(0, 3);
            if (this.subCateList.length > 0) {
                this.defaultSubCate = this.subCateList[0].id;
                this.subGoodList = this.goodList.filter(g => g.subCateId === this.defaultSubCate);
            }
            this.newList = this.goodList.sort(() => Math.random() - 0.5).slice(0, 12);
            this.hotList = this.goodList.slice(0, 10).map((g, index) => new GoodsModel({rank: ++index, ...g}));
            this.isLoading = false;
        });
    }

    onLogin() {
        this.router.navigateByUrl('/login');
    }

    doRefresh(event) {
        this.getList();
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }


}
