import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {AuthGuard} from '../shared';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'home',
                loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
            },
            {
                path: 'cate',
                loadChildren: () => import('../pages/favorite-list/favorite-list.module').then(m => m.FavoriteListPageModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'order',
                loadChildren: () => import('../pages/order/order.module').then(m => m.OrderPageModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'my',
                loadChildren: () => import('../pages/my/my.module').then(m => m.MyPageModule)
            },
            {
                path: '', redirectTo: '/tabs/home', pathMatch: 'full'
            }
        ]
    },
    {
        path: '', redirectTo: '/tabs/home', pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
