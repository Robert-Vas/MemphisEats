import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {NutritionFieldsModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';


@Injectable({providedIn: 'root'})
export class NutritionFieldsService extends BaseService<NutritionFieldsModel> {
    constructor(public db: AngularFirestore,
                public myErr: MyError) {
        super(db, myErr, 'nutrition_fields');
    }
}

