import {Id} from './common.model';
import {DishesModel, LocationsModel} from './';


export class MealsModel implements Id {
  public id?: string;
  public dish_ids: string[];
  public description_en: string;
  public description_sp: string;
  public location_ids: string[];
  public dates_available: string[];
  public dishes: DishesModel[];
  public locations: LocationsModel[];

  constructor(meal: any = {}) {
    this.id = meal.id;
    this.dish_ids = meal.dish_ids;
    this.description_en = meal.description_en;
    this.description_sp = meal.description_sp;
    this.location_ids = meal.location_ids;
    this.dates_available = meal.dates_available;
    this.dishes = meal.dishes || [];
    this.locations = meal.locations || [];
  }
}
