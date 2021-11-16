import {Id} from './common.model';
import {CategoriesModel, IngredientsModel, NutritionFieldsModel, DishTypesModel, AllergensModel} from './';

export class DishesModel implements Id {
    public id?: string;
    public category_ids: string[];
    public date: string;
    public desc_en: string;
    public desc_sp: string;
    public dish_type_id: string;
    public img: string;
    public ingredient_ids: string[];
    public is_vegan: boolean;
    public name_en: string;
    public name_sp: string;
    public nutrition_fields: {};
    public prep_minutes: number;
    public price: number;
    public procedure_en: string;
    public procedure_sp: string;
    public allergen_ids: string[];

    public meal_id: string;

    public isFavorite?: boolean;
    public isBag?: boolean;
    public rank?: number;
    public nutInfo?: string[];

    public categories?: CategoriesModel[];
    public ingredients?: IngredientsModel[];
    public nutritionFields?: NutritionFieldsModel[];
    public allergens?: AllergensModel[];
    public dishType?: DishTypesModel;

    constructor(dishes: any = {}) {
        this.category_ids = dishes.category_ids;
        this.id = dishes.id;
        this.img = dishes.img;
        this.name_en = dishes.name_en || '';
        this.name_sp = dishes.name_sp || '';
        this.price = dishes.price || 0;
        this.desc_en = dishes.desc_en || '';
        this.desc_sp = dishes.desc_sp || '';
        this.procedure_en = dishes.desc_en || '';
        this.procedure_sp = dishes.desc_sp || '';
        this.prep_minutes = dishes.prep_minutes || 0;
        this.nutrition_fields = dishes.nutrition_fields;
        this.is_vegan = dishes.is_vegan || false;
        this.ingredient_ids = dishes.ingredient_ids;
        this.allergen_ids = dishes.allergen_ids || [];
        this.date = dishes.date;
        this.meal_id = '';
        this.nutInfo = [];

        this.categories = dishes.categories || [];
        this.ingredients = dishes.ingredients || [];
        this.allergens = dishes.allergens || [];
        this.nutritionFields = dishes.nutritionFields || [];
        this.dishType = dishes.dishType;

        this.rank = dishes.rank || 0;
        this.isFavorite = dishes.isFavorite || false;
        this.isBag = dishes.isBag || false;
    }
}



