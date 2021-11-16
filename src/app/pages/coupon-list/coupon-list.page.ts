import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnimationProvider} from '../../shared/providers';
import {CouponsService, MyCouponsService} from '../../shared/fapi';
import {CouponModel} from '../../shared/model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-coupon-list',
    templateUrl: './coupon-list.page.html',
    styleUrls: ['./coupon-list.page.scss'],
})
export class CouponListPage implements OnInit, OnDestroy {
    gList: Array<CouponModel>;
    img = 'assets/img/my/discount.jpg';
    list = [1, 2, 3, 4, 5];
    sub: Subscription;

    constructor(private couponService: CouponsService,
                private myCouponService: MyCouponsService,
                private animationProvider: AnimationProvider,) {
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit() {
        this.sub = this.couponService.getList().subscribe(r => {
            this.gList = r;
            this.gList = this.gList.filter(c => c.enable)
                .filter(c => new Date(c.endDate) >= new Date() && new Date(c.beginDate) <= new Date())
                .sort((a, b) => a.sort - b.sort);
        });
    }

    animation(i) {
        return this.animationProvider.slideInLeft(i);
    }
}
