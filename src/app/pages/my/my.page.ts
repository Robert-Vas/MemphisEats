import {Component, NgZone, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Events} from '@ionic/angular';
import {Router} from '@angular/router';
import {AnimationProvider} from '../../shared/providers';
import {TranslateService} from '@ngx-translate/core';
import {AuthService, UsersService} from '../../shared/fapi';
import { Subscription } from 'rxjs';

export interface Language {
    id: string;
    title: string;
}

@Component({
    selector: 'app-my',
    templateUrl: './my.page.html',
    styleUrls: ['./my.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MyPage implements OnInit, OnDestroy {
    menuList = [
        {name: 'Statistics', img: 'stats', url: '/pages/statistics'},
        {name: 'Cart', img: 'cart', url: '/cart'},
        {name: 'Coupons', img: 'pricetags', url: '/pages/coupon-list2'},
        {name: 'Profile', img: 'md-person', url: '/pages/profile'},
        {name: 'Addresses', img: 'pin', url: '/pages/address-list'},
    ];
    list = [
        {name: 'Payment Info', img: 'card', url: '/pages/card'},
        {name: 'Favorite Meals', img: 'heart', url: '/pages/favorite-list'},
        {name: 'Notifications', img: 'md-notifications', url: '/pages/notice'},
    ];

    languages: Language[];
    selectedLanguage: string;
    sub: Subscription;
    customAlertOptions: any = {
        header: 'selected Language',
        translucent: true
    };
    isRefresh = false;

    constructor(private events: Events,
                private router: Router,
                private aProvider: AnimationProvider,
                private zone: NgZone,
                private translate: TranslateService,
                private userService: UsersService,
                public authService: AuthService) {
        this.translate.use('en');
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit() {
        this.languages = [
            {
                id: 'en',
                title: 'English'
            },
            {
                id: 'es',
                title: 'Español'
            }
        ];
        this.selectedLanguage = this.translate.currentLang;
    }

    animation(i) {
        return this.aProvider.slideInRight(i);
    }

    onLogin() {
        this.router.navigateByUrl('/login');
    }

    onRegister() {
        this.router.navigateByUrl('/register');
    }

    onlogout() {
        this.authService.isAuthenticated = false;
        this.authService.user = null;
        this.events.publish('logout');
    }

    setLanguage() {
        this.translate.use(this.selectedLanguage);
    }

    onRefresh() {
        this.isRefresh = true;
        this.sub = this.userService.getModel(this.authService.user.uid).subscribe(r => {
            this.authService.user = r;
            console.log(r)
            this.isRefresh = false;
        });
    }

}
