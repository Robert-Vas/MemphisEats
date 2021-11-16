import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {ProfileFieldsModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';


@Injectable({providedIn: 'root'})
export class ProfileFieldsService extends BaseService<ProfileFieldsModel> {
    constructor(public db: AngularFirestore,
                public myErr: MyError) {
        super(db, myErr, 'profile_fields');
    }
}

