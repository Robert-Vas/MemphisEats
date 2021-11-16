import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {IngredientsModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';


@Injectable({providedIn: 'root'})
export class IngredientsService extends BaseService<IngredientsModel> {
    constructor(public db: AngularFirestore,
                public myErr: MyError) {
        super(db, myErr, 'ingredients');
    }
}

