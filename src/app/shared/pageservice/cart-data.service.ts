import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalProvider } from '../providers';
import { CartModel, DishesModel } from '../model';

@Injectable({ providedIn: 'root' })
export class CartDataService {
    private _cartSubject: BehaviorSubject<CartModel[]>;
    cart$: Observable<CartModel[]>;

    constructor(private globals: GlobalProvider) {
        const cache = sessionStorage.getItem(globals.cartKey);
        const cart = cache ? JSON.parse(cache) as CartModel[] : [];
        this._cartSubject = new BehaviorSubject<CartModel[]>(cart);
        this.cart$ = this._cartSubject.asObservable();
    }

    public addItemToCart(model: CartModel) {
        const cart = this._cartSubject.getValue();
        const itemIndex = cart.findIndex(i => i.id === model.id);

        if (itemIndex === -1) {
            cart.push(model);
        } else {
            cart[itemIndex].num += model.num;
        }
        
        this.saveCart(cart);
    }

    public changeItemNumById(id: string, num: number) {
        const cart = this._cartSubject.getValue();

        const itemIndex = cart.findIndex(i => i.id === id);
        if (itemIndex >= 0) {
            cart[itemIndex].num = num;
        }

        this.saveCart(cart);
    }

    public getNum$(): Observable<number> {
        return this.cart$.pipe(map(c => c.length));
    }

    public saveCart<T extends DishesModel>(cart: T[]) {
        // todo: re-evaluate if we should keep this method public or not
        // might just want to add a new method that allows deleting specific cart items
        sessionStorage.setItem(this.globals.cartKey, JSON.stringify(cart));
        this._cartSubject.next(cart as unknown as CartModel[]);
    }

    public clear() {
        this.saveCart([]);
    }

    // todo: remove this once it's no longer being used
    /** @deprecated This method should not be used; instead, subscribe to `cart$`. */
    public getList(): CartModel[] {
        return this._cartSubject.getValue();
    }
}
