import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FavoriteDishModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';

@Injectable({providedIn: 'root'})
export class FavoriteDishService extends BaseService<FavoriteDishModel> {
    constructor(public db: AngularFirestore,
                public myErr: MyError) {
        super(db, myErr, 'dishesFavorites');
    }
}

