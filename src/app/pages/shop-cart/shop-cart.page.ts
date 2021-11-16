import {AfterViewInit, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {GoodsService} from '../../shared/fapi';
import {CartModel, GoodsModel} from '../../shared/model';
import {CartDataService} from '../../shared';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shop-cart',
    templateUrl: './shop-cart.page.html',
    styleUrls: ['./shop-cart.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ShopCartPage implements AfterViewInit, OnDestroy {
    value = 1;
    goodModel: GoodsModel;
    sub: Subscription;

    constructor(public modalCtrl: ModalController,
                public navParams: NavParams,
                private cartService: CartDataService,
                private goodService: GoodsService) {
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit() {
        const id = this.navParams.get('selectId');
        this.sub = this.goodService.getModel(id).subscribe(g => this.goodModel = g);
    }

    change(event) {
        this.value = event;
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }

    addCart() {
        const cart = new CartModel(this.goodModel);
        cart.num = this.value;
        this.cartService.addItemToCart(cart);
        this.modalCtrl.dismiss();
    }

}
