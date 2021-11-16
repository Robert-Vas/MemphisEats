import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {DishesListPage} from './dishes-list.page';
import {DishesFilterPage} from '../dishes-filter/dishes-filter.page';
import {ComponentsModule} from '../../components/components.module';

const routes: Routes = [
    {
        path: '',
        component: DishesListPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ComponentsModule
    ],

    declarations: [DishesListPage, DishesFilterPage],
    entryComponents: [DishesFilterPage]
})
export class DishesListPageModule {
}
