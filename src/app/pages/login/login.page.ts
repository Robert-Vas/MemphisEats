import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertProvider, GlobalProvider, LoadingProvider} from '../../shared/providers';
import {Router} from '@angular/router';
import {AuthService, LogService, UsersService,} from '../../shared/fapi';
import {LogModel, UserModel} from '../../shared/model';
import {DatePipe} from '@angular/common';
import {CustomValidators} from '../../shared/custom-validators';
import { Subscription } from 'rxjs';
import { FcmService } from '../../shared/api/fcm.service';
import { Capacitor } from '@capacitor/core';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginPage implements OnInit, OnDestroy {
    loginForm: FormGroup;
    isShow = false;
    sub: Subscription;

    constructor(private loadingProvider: LoadingProvider,
                private alertProvider: AlertProvider,
                private gProvider: GlobalProvider,
                private datePipe: DatePipe,
                private router: Router,
                private userService: UsersService,
                private logService: LogService,
                private formBuilder: FormBuilder,
                private authService: AuthService,
                private fcmService: FcmService) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            pwd: ['',
                Validators.compose([
                    // 1. Password Field is Required
                    Validators.required,
                    // 2. check whether the entered password has a number
                    CustomValidators.patternValidator(/\d/, {hasNumber: true}),
                    // 3. check whether the entered password has upper case letter
                    CustomValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
                    // 4. check whether the entered password has a lower-case letter
                    CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),
                    // 5. check whether the entered password has a special character
                    CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {hasSpecialCharacters: true}),
                    // 6. Has a minimum length of 6 characters
                    Validators.minLength(6)
                ])]
        });
    }
    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    ngOnInit() {
    }

    async login() {
        const email = this.loginForm.controls.email.value;
        const pwd = this.loginForm.controls.pwd.value;
        const loader = await this.loadingProvider.create();
        await loader.present();
        this.authService.signWithEmail(email, pwd).then(r => {
            if (r) {
                this.sub = this.userService.getModel(r.user.uid).subscribe(result => loader.dismiss().then(() => {
                    const log = new LogModel();
                    log.userId = r.user.uid;
                    log.device = this.authService.device;
                    log.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
                    this.logService.addLog(log);
                    const user = new UserModel();
                    user.uid = result.uid;
                    user.id =  result.uid;
                    user.displayName = result.displayName;
                    user.email = r.user.email;
                    user.photoURL = r.user.photoURL;
                    user.balance = result.balance;
                    user.zip = result.zip;
                    user.allergens = result.allergens;
                    user.fullName = result.fullName;
                    user.profile = result.profile;
                    user.lastDate = result.lastDate;
                    user.registerDate = result.registerDate;
                    if (Capacitor.platform !== 'web') {
                        if (user.tokens == undefined) {
                            user.tokens = [this.fcmService.deviceToken];
                            this.userService.update(user);
                        }
                        else if (!user.tokens.includes(this.fcmService.deviceToken)) {
                            user.tokens.push(this.fcmService.deviceToken);
                            this.userService.update(user);
                        }
                    }
                    this.authService.user = user;
                    this.authService.isAuthenticated = true;
                    this.router.navigateByUrl('/tabs/home');
                }));

            } else {
                this.alertProvider.present('invalid email or password');
            }
        }).catch(error => loader.dismiss().then(() => this.alertProvider.present(error)));
    }

    onToggle() {
        this.isShow = !this.isShow;
    }

}
