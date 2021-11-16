import {Component, OnDestroy, OnInit} from '@angular/core';
import {BannerModel, DishesModel, CateModel, CategoriesModel, GoodsModel, MealsModel, NoticeModel, SubCateModel} from '../../shared/model';
import {Events} from '@ionic/angular';
import {Router} from '@angular/router';
import * as moment from 'moment';

import {
    PageDataService,
    MealsService,
    BannerService,
    CategoriesService,
    CateService,
    CouponsService,
    GoodsService,
    SubCateService,
    NoticeService,
    AuthService
} from '../../shared';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
    isLoading = true;
    twoWeeksOut = [];
    datestrings: [string, string][] = [];
    datetext = [];
    bannerList: Array<BannerModel>;
    sub: Subscription;


    notice = 'Get $5 off your first weeks purchase;';
    cateList: Array<CateModel>;
    categoryList: Array<CategoriesModel>;
    mealList: Array<any>;
    hotList: Array<GoodsModel>;
    goodList: Array<GoodsModel>;
    subGoodList: Array<GoodsModel>;
    subCateList: Array<SubCateModel>;
    noticeList: Array<NoticeModel>;
    newList: Array<GoodsModel>;
    defaultSubCate: string;
    constructor(private bannerService: BannerService,
                private mealsService: MealsService,
                private categoriesService: CategoriesService,
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
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit() {
         this.getTwoWeeks()
    }

    getTwoWeeks() {

        const weekdays = new Array(7);
        weekdays[0] = "Sunday";
        weekdays[1] = "Monday";
        weekdays[2] = "Tuesday";
        weekdays[3] = "Wednesday";
        weekdays[4] = "Thursday";
        weekdays[5] = "Friday";
        weekdays[6] = "Saturday";


        const today = moment();
        for (let i = 1; i <= 14; i++) {
            const day = moment(today).add(i, 'days');
            if (day.isoWeekday() < 5){
                this.datestrings.push([weekdays[day.day()], (day.month() + 1) + '-' + day.date() + '-' + day.year()]);
            }
        }
        this.getList();
    }

    getList() {


        this.sub = this.mealsService.getFullList().subscribe(meals => {
            const finalarr = [];
            this.datestrings.forEach(ds => {
                const mealarr = [];
                meals.forEach(meal => {
                    if (meal.dates_available.includes(ds[1])){
                        mealarr.push(meal);
                    }
                });
                finalarr.push({
                    datetxt: ds[0] + ' ' + ds[1],
                    // the following adds a lot of complexity to this loop
                    // moment, honestly, does not belong in this application
                    // however, it is now summer, and that's too much work for post-graduation
                    // todo: redo the `datestrings` array to contain an array of JavaScript `Date`s
                    // then use the date pipe in the template to make them "pretty"
                    date: moment(ds[1], 'M-DD-YYYY').toDate().toJSON(),
                    meals: mealarr
                });
            });

            this.mealList = finalarr;
            this.isLoading = false;
        })


        const list: Array<any> = [this.bannerService.getList(), this.cateService.getList(),
            this.goodService.getList(), this.subCateService.getList(), this.noticeService.getList()];

        this.pageService.getList1(list).then(r => {
            this.bannerList = r[0];
            this.cateList = r[1];
            this.goodList = r[2];
            this.subCateList = r[3];
            this.noticeList = r[4];
            this.notice = this.noticeList.map(n => n.description).reduce((p, c) => p + '...     ' + c, '');
            this.subCateList = this.subCateList.sort((a, b) => a.sort - b.sort);
            this.subCateList = this.subCateList.slice(0, 3);
            if (this.subCateList.length > 0) {
                this.defaultSubCate = this.subCateList[0].id;
                this.subGoodList = this.goodList.filter(g => g.subCateId === this.defaultSubCate);
            }
            this.newList = this.goodList.sort(() => Math.random() - 0.5).slice(0, 12);
            this.hotList = this.goodList.slice(0, 10).map((g, index) => new GoodsModel({rank: ++index, ...g}));
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
