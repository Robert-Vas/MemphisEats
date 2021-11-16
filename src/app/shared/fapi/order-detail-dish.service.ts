import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {DishesModel, OrderDetailDishModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {map, mergeMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class OrderDetailDishService extends BaseService<OrderDetailDishModel> {
    constructor(public db: AngularFirestore,
                public myErr: MyError) {
        super(db, myErr, 'orderdetail');
    }

    getList1(orderId: string) {
        return this.db.collection<OrderDetailDishModel>('orderdetail',
            ref => ref.where('orderId', '==', orderId)).valueChanges()
            .pipe(map(detail => detail[0]), mergeMap(detail => {
                return this.db.doc<DishesModel>(`/dishes/${detail.dishId}`)
                    .valueChanges()
                    .pipe(map(g => [({...g, ...detail})]));
            }));
    }
}
