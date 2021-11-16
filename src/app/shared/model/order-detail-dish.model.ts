import {Id} from './common.model';

export class OrderDetailDishModel implements Id {
    public id?: string;
    public orderId: string;
    public dishId: string;
    public num: number;
    public detailPrice: number;
    public amount: number;

    constructor(model: any = {}) {
        this.id = model.id;
        this.orderId = model.orderId;
        this.dishId = model.dishId;
        this.num = model.num;
        this.amount = model.amount;
        this.detailPrice = model.detailPrice;
    }
}

export class OrderDetailDishView {
    public name: string;
    public id?: string;
    public orderId: string;
    public dishId: string;
    public num: number;
    public detailPrice: number;
    public amount: number;
    public img: string;

    constructor(model: any = {}) {
        this.name = model.name;
        this.id = model.id;
        this.orderId = model.orderId;
        this.dishId = model.dishId;
        this.num = model.num;
        this.detailPrice = model.detailPrice;
        this.amount = model.amount;
        this.img = model.img;

    }
}




