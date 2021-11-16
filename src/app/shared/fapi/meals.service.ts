import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {MealsModel, DishesModel, LocationsModel, CategoriesModel, IngredientsModel, NutritionFieldsModel} from '../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {combineLatest, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class MealsService extends BaseService<MealsModel> {
    constructor(public db: AngularFirestore,
                public myErr: MyError) {
        super(db, myErr, 'meals');
    }

    getMealById(mealid: string) {
        return this.db.collection<MealsModel>('meals', ref => ref.where('__name__', '==', mealid)).valueChanges();
    }


    getFullList() {
        return combineLatest(
            [this.db.collection<MealsModel>('meals').snapshotChanges(),
                this.db.collection<DishesModel>('dishes').snapshotChanges(),
                this.db.collection<LocationsModel>('locations').snapshotChanges(),
                this.db.collection<CategoriesModel>('categories').snapshotChanges(),
                this.db.collection<IngredientsModel>('ingredients').snapshotChanges(),
                this.db.collection<NutritionFieldsModel>('nutrition_fields').snapshotChanges()
            ]).pipe(
            map(results => {
                const mealsList = results[0].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as MealsModel;
                });
                const dishesList = results[1].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as DishesModel;
                });
                const locationsList = results[2].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as LocationsModel;
                });
                const categoriesList = results[3].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as CategoriesModel;
                });
                const ingredientsList = results[4].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as IngredientsModel;
                });
                const nutritionFieldsList = results[5].map((action) => {
                    const data = action.payload.doc.data();
                    return ({id: action.payload.doc.id, ...data}) as NutritionFieldsModel;
                });


                const meals = mealsList.map(meal => {
                    const dishes = dishesList.filter(dish => {
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

                        if (meal.dish_ids.includes(dish.id)) {
                            dish.meal_id = meal.id;
                            return dish;
                        }
                    });
                    meal.dishes = dishes;

                    const locations = locationsList.map( location => {
                        if (meal.location_ids.includes(location.id)) {
                            return location;
                        }
                    });

                    meal.locations = locations;
                    return meal;
                });

                return meals;

            }));
        }
    }