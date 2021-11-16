import {Component, QueryList, ViewChildren, OnDestroy} from '@angular/core';
import {Events, IonRouterOutlet, MenuController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {GlobalProvider, ToastProvider} from './shared/providers';
import {Router} from '@angular/router';
import {AuthService, SubCateService} from './shared/fapi';
import {FModel, SubCateModel} from './shared/model';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import * as moment from 'moment';
import { subscribeOn } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy{
    cateList: Array<SubCateModel>;
    lastBackPress = 0;
    timePeriodToExit = 2000;
    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
    min: string;
    max: string;
    sub: Subscription;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private gProvider: GlobalProvider,
        private router: Router,
        private toastProvider: ToastProvider,
        private authService: AuthService,
        private subCateService: SubCateService,
        private menu: MenuController,
        private events: Events,
        private screenOrientation: ScreenOrientation
    ) {
        this.initializeApp();
        this.gProvider.isAndroid = this.platform.is('android');
        this.gProvider.isIos = this.platform.is('ipad') || this.platform.is('iphone')
            || this.platform.is('ios');
        this.gProvider.isWeb = this.platform.is('mobile');
        this.gProvider.isApp = this.platform.is('cordova');
        this.authService.device = this.gProvider.isAndroid ? 'Android' : 'Mobile';
        this.sub = new Subscription();
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.statusBar.backgroundColorByHexString('#68686b38');
            if (this.gProvider.isApp) {
                this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
            }
            this.splashScreen.hide();
            this.backButton();
            this.bindData();
        });
    }

    bindData() {
        this.sub.add(this.subCateService.getList().subscribe(result => {
            this.cateList = result;
            this.cateList = this.cateList.map(c => new SubCateModel({state: false, ...c}));
        }));
    }

    backButton() {
        this.sub.add(this.platform.backButton.subscribeWithPriority(1, () => {
            this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
                if (this.router.url === '/tabs/home' || this.router.url === '/tabs/cate'
                    || this.router.url === '/tabs/my' || this.router.url === '/tabs/order') {
                    if (new Date().getTime() - this.lastBackPress < this.timePeriodToExit) {
                        navigator['app'].exitApp();
                    } else {
                        this.toastProvider.show('Press back again to exit App');
                        this.lastBackPress = new Date().getTime();
                    }
                } else {
                    if (outlet && outlet.canGoBack()) {
                        outlet.pop();
                    }
                }
            });
        })); 
    }

    ionChange(event) {
        if (event.target.value) {
            this.min = event.target.value.lower;
            this.max = event.target.value.upper;
        }
    }

    onCheckCate(id: string) {
        this.cateList.map(f => {
            if (f.id === id) {
                f.checked = !f.checked;
            }
        });
    }

    dismiss() {
        this.menu.close('search').then();
    }

    onFilter() {
        const list = this.cateList.filter(f => f.checked).map(c => c.id);
        const fmodel = new FModel({min: this.min, max: this.max});
        fmodel.list = list;
        this.menu.close('search').then(() => {
            this.events.publish('search', fmodel);
        });
    }

}
