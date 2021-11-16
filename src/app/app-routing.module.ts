import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/slides/slides.module').then(m => m.SlidesPageModule)
    },
    {
        path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesPageModule)},
    {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)},
    {path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)}
    , {
        path: 'cart',
        loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule)
    }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
