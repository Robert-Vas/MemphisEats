import {Id} from './common.model';

export class PushNotificationsPickup implements Id {
    public id?: string;
    public token: string;
    public date: string;

    constructor(model: any = {}) {
        this.id = model.id;
        this.token = model.token;
        this.date = model.date;
    }
}
