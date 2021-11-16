import {Id} from './common.model';
import {DishesModel} from './dishes.model';

export class FavoriteModel implements Id {
    public id?: string;
    public userId: string;
    public dishId: string;
    public date: string;

    public constructor(model: any = {}) {
        this.dishId = model.dishId;
        this.userId = model.userId;
        this.date = model.date;
    }
}

