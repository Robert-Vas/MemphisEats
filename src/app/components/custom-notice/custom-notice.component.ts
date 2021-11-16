import {Component, Input} from '@angular/core';

@Component({
    selector: 'custom-notice',
    templateUrl: './custom-notice.component.html',
    styleUrls: ['./custom-notice.component.scss'],
})
export class CustomNoticeComponent {
    @Input() notice = 'Get coupon code: Get $5 Flat Rate Shipping On Select fruit Products';

    constructor() {
    }
}
