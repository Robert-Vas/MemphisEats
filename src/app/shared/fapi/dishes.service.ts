import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {DishesModel,
    LocationsModel,
    CategoriesModel,
    IngredientsModel,
    NutritionFieldsModel,
    DishTypesModel,
    AllergensModel,
    FavoriteModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {map} from 'rxjs/operators';
import {combineLatest} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DishesService extends BaseService<DishesModel> {
    constructor(public db: AngularFirestore,
                public myErr: MyError) {
        super(db, myErr, 'dishes');
    }



    getDishesByIds(dishids: string[]) {
        return combineLatest([
            this.db.collection<DishesModel>('dishes', ref => ref.where('__name__', 'in', dishids)).snapshotChanges(),
            this.db.collection<CategoriesModel>('categories').snapshotChanges(),
            this.db.collection<IngredientsModel>('ingredients').snapshotChanges(),
            this.db.collection<NutritionFieldsModel>('nutrition_fields').snapshotChanges(),
            this.db.collection<DishTypesModel>('dish_types').snapshotChanges(),
            this.db.collection<AllergensModel>('allergens').snapshotChanges()
        ]).pipe(
            map(results => {
                const dishesList = results[0].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as DishesModel;
                });

                const categoriesList = results[1].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as CategoriesModel;
                });

                const ingredientsList = results[2].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as IngredientsModel;
                });

                const nutritionFieldsList = results[3].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as NutritionFieldsModel;
                });

                const dishTypesList = results[4].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as DishTypesModel;
                });

                const allergensList = results[5].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as AllergensModel;
                });

                const dishes = dishesList.map(dish => {
                    const categories = categoriesList.map(category => {
                        if (dish.category_ids.includes(category.id)) {
                                return category;
                            }
                        });
                    dish.categories = categories;

                    const ingredients = ingredientsList.map(ingredient => {
                        if (dish.ingredient_ids.includes(ingredient.id)) {
                                    return ingredient;
                        }
                    });

                    dish.ingredients = ingredients;

                    const nutritionFields = nutritionFieldsList.map( nutritionField => {
                        if (nutritionField.id in dish.nutrition_fields) {
                            return nutritionField;
                        }
                    });

                    dish.nutritionFields = nutritionFields;

                    const dishType = dishTypesList.find( dt => dish.dish_type_id === dt.id);

                    dish.dishType = dishType;

                    const allergens = allergensList.map(allergen => {
                        if (dish.allergen_ids.includes(allergen.id)) {
                                    return allergen;
                        }
                    });

                    dish.allergens = allergens;
                    return dish;
                });

                return dishes;

            })
        )
    }

    getFullList() {
        return combineLatest(
            [this.db.collection<DishesModel>('dishes').snapshotChanges(),
                this.db.collection<CategoriesModel>('categories').snapshotChanges(),
                this.db.collection<IngredientsModel>('ingredients').snapshotChanges(),
                this.db.collection<NutritionFieldsModel>('nutrition_fields').snapshotChanges(),
                this.db.collection<DishTypesModel>('dish_types').snapshotChanges(),
                this.db.collection<AllergensModel>('allergens').snapshotChanges()
            ]).pipe(
            map(results => {
                const dishesList = results[0].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as DishesModel;
                });

                const categoriesList = results[1].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as CategoriesModel;
                });

                const ingredientsList = results[2].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as IngredientsModel;
                });

                const nutritionFieldsList = results[3].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as NutritionFieldsModel;
                });

                const dishTypesList = results[4].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as DishTypesModel;
                });

                const allergensList = results[5].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as AllergensModel;
                });

                const dishes = dishesList.map(dish => {
                    const categories = categoriesList.map(category => {
                        if (dish.category_ids.includes(category.id)) {
                                return category;
                            }
                        });
                    dish.categories = categories;

                    const ingredients = ingredientsList.map(ingredient => {
                        if (dish.ingredient_ids.includes(ingredient.id)) {
                                    return ingredient;
                        }
                    });

                    dish.ingredients = ingredients;

                    const nutritionFields = nutritionFieldsList.map( nutritionField => {
                        if (nutritionField.id in dish.nutrition_fields) {
                            return nutritionField;
                        }
                    });

                    dish.nutritionFields = nutritionFields;

                    const dishType = dishTypesList.find( dishType => dish.dish_type_id === dishType.id);

                    dish.dishType = dishType;

                    const allergens = allergensList.map(allergen => {
                        if (dish.allergen_ids.includes(allergen.id)) {
                                    return allergen;
                        }
                    });

                    dish.allergens = allergens;

                    return dish;
                });

                return dishes;
            })
        );
    }


}


