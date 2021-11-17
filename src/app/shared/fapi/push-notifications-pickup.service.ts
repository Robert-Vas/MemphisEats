import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { PushNotificationsPickup } from '../../shared/model/push-notifications-pickup.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { MyError } from './my-error';

@Injectable({providedIn: 'root'})
export class PushNotificationsPickupService extends BaseService<PushNotificationsPickup> {
    constructor(public db: AngularFirestore, public myErr: MyError) {
        super(db, myErr, 'push_notifications_pickup');
    }
}