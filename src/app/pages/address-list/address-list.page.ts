import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Events} from '@ionic/angular';
import {Router} from '@angular/router';
import {AddressService, AuthService, UsersService} from '../../shared/fapi';
import {AddressModel} from '../../shared/model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-address-list',
    templateUrl: './address-list.page.html',
    styleUrls: ['./address-list.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AddressListPage implements OnInit, OnDestroy {
    list: Array<AddressModel>;
    isLoading = true;
    sub: Subscription;

    constructor(
        private addService: AddressService,
        private  router: Router,
        public authService: AuthService,
        private event: Events) {
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit() {
        this.getAddress();
        this.addressSub();
    }

    getAddress() {
        this.sub = this.addService.getListByParam('userId', this.authService.user.uid).subscribe(r => {
            this.list = r;
            this.isLoading = false;
        });
    }

    public addressSub() {
        this.sub.add(this.event.subscribe('add-address', s => this.getAddress()));
    }

    addAddress() {
        this.router.navigateByUrl('/pages/my-address');
    }

}
