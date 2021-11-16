import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import {CouponsService} from '../../shared/fapi';
import {CouponModel} from '../../shared/model';
import {AlertProvider} from '../../shared/providers';

@Component({
    selector: 'app-coupon',
    templateUrl: './coupon.page.html',
    styleUrls: ['./coupon.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CouponPage implements OnDestroy {
    coupon: CouponModel;
    sub: Subscription;

    constructor(private route: ActivatedRoute,
                private alertProvider: AlertProvider,
                private couponService: CouponsService) {
        const id = this.route.snapshot.paramMap.get('id');
        this.sub = this.couponService.getModel(id).subscribe(s => {
            this.coupon = s;
        });
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
