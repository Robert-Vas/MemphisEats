import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {DishTypesModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';


@Injectable({providedIn: 'root'})
export class DishTypesService extends BaseService<DishTypesModel> {
    constructor(public db: AngularFirestore,
                public myErr: MyError) {
        super(db, myErr, 'dish_types');
    }
}

