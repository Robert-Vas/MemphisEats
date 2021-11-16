import {DishesModel} from './dishes.model';

export class CartModel extends DishesModel {
    public isCheck: boolean;
    public num: number;
    public readyOn: string;

    public constructor(model: any = {}) {
        super(model);
        this.isCheck = model.isCheck;
        this.num = model.num || 0;
    }
}
