import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {GoodsModel, Order, OrderDetailModel, UserModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {combineLatest, of} from 'rxjs';


@Injectable({providedIn: 'root'})
export class OrderService extends BaseService<Order> {
    constructor(public db: AngularFirestore,
                public myErr: MyError) {
        super(db, myErr, 'orders');
    }

    getOrderList(userId: string) {
        return combineLatest(
            [this.db.collection<Order>('orders', ref => ref.where('userId', '==', userId)).snapshotChanges(),
                this.db.collection<OrderDetailModel>('orderdetail').snapshotChanges(),
                this.db.collection<GoodsModel>('goods').snapshotChanges()
            ]).pipe(
            map(results => {
                const orderList = results[0].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as Order;
                });
                const detailList = results[1].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as OrderDetailModel;
                });
                const goodList = results[2].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as GoodsModel;
                });
                const dgList = detailList.map(d => {
                    const good = goodList.find(g => g.id === d.goodId);
                    return ({...d, ...good});
                });
                return orderList ? orderList.map(order => {
                    return {
                        ...order,
                        details: dgList.filter(d => d.orderId === order.id)
                    };
                }) : [];
            }));

    }
}
