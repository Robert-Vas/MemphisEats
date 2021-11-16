import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {CategoriesModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';


@Injectable({providedIn: 'root'})
export class CategoriesService extends BaseService<CategoriesModel> {
    constructor(public db: AngularFirestore,
                public myErr: MyError) {
        super(db, myErr, 'categories');
    }
}

