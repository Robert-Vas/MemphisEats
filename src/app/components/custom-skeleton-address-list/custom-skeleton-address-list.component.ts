import {Component, Input} from '@angular/core';
import {AddressModel} from '../../shared/model';

@Component({
    selector: 'custom-skeleton-address-list',
    templateUrl: './custom-skeleton-address-list.component.html',
    styleUrls: ['./custom-skeleton-address-list.component.scss'],
})
export class CustomSkeletonAddressListComponent {
    img = 'assets/img/my/adbg.jpg';
    list = [1, 2, 3];

    constructor() {
    }

}
