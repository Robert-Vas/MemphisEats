import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {PROVIDERS} from './inport-provider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {NgZorroAntdMobileModule} from 'ng-zorro-antd-mobile';
import {LOCAL_PROVIDER_TOKEN, en_US} from 'ng-zorro-antd-mobile';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {ShopCartPage} from './pages/shop-cart/shop-cart.page';
import {MyErrorHandler} from './shared/my-error.handler';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {WebStorageModule} from 'ngx-store';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {DatePipe} from '@angular/common';
import {ComponentsModule} from './components/components.module';
import {QRCodeModule} from 'angularx-qrcode';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
    declarations: [AppComponent, ShopCartPage],
    entryComponents: [ShopCartPage],
    imports: [
        BrowserModule,
        IonicModule.forRoot({
            mode: 'ios',
            backButtonText: ''
        }),
        IonicStorageModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        SharedModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        WebStorageModule,
        NgZorroAntdMobileModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        ComponentsModule,
        QRCodeModule,
        FontAwesomeModule
    ],
    providers: [
        DatePipe,
        PROVIDERS,
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        {provide: LOCAL_PROVIDER_TOKEN, useValue: en_US},
        {provide: ErrorHandler, useClass: MyErrorHandler},
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(library: FaIconLibrary) { 
		library.addIconPacks(fas, fab, far);
	}   
}
