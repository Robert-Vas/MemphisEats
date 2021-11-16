import {Component, OnInit} from '@angular/core';
import {AuthService, FavoriteService, DishesService} from '../../shared/fapi';
import {FavoriteModel, DishesModel} from '../../shared/model';
import {AnimationProvider, PageDataService} from '../../shared';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
    selector: 'app-favorite-list',
    templateUrl: './favorite-list.page.html',
    styleUrls: ['./favorite-list.page.scss']
})
export class FavoriteListPage implements OnInit {
    dList: Array<DishesModel>;
    dishList: Array<DishesModel>;
    fList: Array<FavoriteModel>;
    isLoading = true;
    opened = {};

    constructor(private dishesService: DishesService,
                private favoriteService: FavoriteService,
                private pageService: PageDataService,
                private animationProvider: AnimationProvider,
                private authService: AuthService) {
    }

    ngOnInit() {
        if (this.authService.isAuthenticated) {
            this.pageService.getList1([this.dishesService.getFullList(),
                this.favoriteService.getListByParam('userId', this.authService.user.uid)])
                .then(results => {
                    this.dList = results[0];
                    this.fList = results[1];
                    this.dishList = this.dList.filter(g => this.fList.find(f => f.dishId === g.id));
                    this.dishList.forEach((dish, i) => {
                        console.log(dish)
                        let nutinfo = [];
                        dish.nutritionFields.forEach(nut => {
                            nutinfo.push(nut.name_en + ': ' + dish.nutrition_fields[nut.id] + ' ' + nut.measurement_display);
                        })

                        this.dishList[i]['nutInfo'] = nutinfo;
                    })

                    this.isLoading = false;
                });
        }

    }

     toggleFunc(nm, id) {
        const keystring = nm + id;
        if (keystring in this.opened) {
            this.opened[keystring] = !this.opened[keystring];
        } else {
            this.opened[keystring] = true;
        }
    }

    animation(i) {
        return this.animationProvider.swingInTopFwd(i);
    }

}
