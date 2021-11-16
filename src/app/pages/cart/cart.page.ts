import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CartModel} from '../../shared/model';
import {CartDataService} from '../../shared';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CartPage implements OnInit {
    cartList: Array<CartModel>;
    total: string;
    value = 1;
    allCheck = false;

    constructor(private cartService: CartDataService) {
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.bind();
    }

    bind() {
        this.cartList = this.cartService.getList();
        if (this.cartList) {
            this.total = this.cartList.map(g => g.price * g.num).reduce((p, c) => p + c, 0).toFixed(2);
            this.isAllCheck();
        }
    }

    change(num: number, id: string) {
        this.total = this.cartList.filter(g => g.isCheck).map(g => g.id === id ? num * g.price : g.num * g.price)
            .reduce((p, c) => p + c, 0)
            .toFixed(2);
        this.cartService.changeItemNumById(id, num);
    }

    delete(id: string) {
        const index = this.cartList.findIndex(g => g.id === id);
        this.cartList.splice(index, 1);
        this.cartService.saveCart(this.cartList);
        this.isAllCheck();
    }

    checkSum() {
        this.total = this.cartList.filter(g => g.isCheck)
            .map(g => g.price * g.num)
            .reduce((p, c) => p + c, 0)
            .toFixed(2);
        this.isAllCheck();
    }

    isAllCheck() {
        //console.log(this.cartList)
        this.allCheck = this.cartList.filter(g => g.isCheck).length === this.cartList.length;
    }

    checkAll() {
        if (this.allCheck) {
            this.cartList.map(g => g.isCheck = true);
        }
    }

    onClear() {
        this.cartService.clear();
        this.cartList = [];
        this.total = '0';
        this.allCheck = false;
    }

    deleteChecked() {
        this.cartList = this.cartList.filter(g => !g.isCheck);
        this.cartService.saveCart(this.cartList);
        this.isAllCheck();
    }
}
