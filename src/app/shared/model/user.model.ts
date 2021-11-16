import {Id} from './common.model';

export class UserModel implements Id {
    public id?: string;
    public uid: string;
    public displayName?: string;
    public email: string;
    public photoURL: string;
    public balance: number;
    public isAdmin: boolean;
    public address: string;
    public fullName: string;
    public city: string;
    public allergens: string[];
    public lastDate: string;
    public registerDate: string;
    public zip: string;
    public profile: {};

    constructor(model: any = {}) {
        this.id = model.id;
        this.uid = model.uid;
        this.displayName = model.displayName;
        this.email = model.email;
        this.photoURL = model.photoURL;
        this.balance = model.balance;
        this.isAdmin  = model.is_admin;
        this.address = model.address;
        this.fullName = model.fullName;
        this.city = model.city;
        this.allergens = model.allergens;
        this.lastDate = model.lastDate;
        this.registerDate = model.registerDate;
        this.zip = model.zip;
        this.profile = model.profle;
    }
}
