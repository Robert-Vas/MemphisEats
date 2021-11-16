import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'custom-coupon-list2',
    templateUrl: './custom-coupon-list2.component.html',
    styleUrls: ['./custom-coupon-list2.component.scss'],
})
export class CustomCouponList2Component implements OnInit {
    @Input() list: any;

    constructor() {
    }

    ngOnInit() {
    }

    toggle(item) {
        item.active = !item.active;
    }
}
