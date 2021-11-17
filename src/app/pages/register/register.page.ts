import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertProvider, LoadingProvider} from '../../shared/providers';
import {Router} from '@angular/router';
import {AuthService, LogService, UsersService} from '../../shared/fapi';
import {LogModel, UserModel} from '../../shared/model';
import {Events} from '@ionic/angular';
import {DatePipe} from '@angular/common';
import {forkJoin, Subscription} from 'rxjs';
import {CustomValidators} from '../../shared/custom-validators';
import { FcmService } from '../../shared/api/fcm.service';
import { Capacitor } from '@capacitor/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RegisterPage implements OnInit, OnDestroy {
    rForm: FormGroup;
    isShow = false;
    isShow1 = false;
    sub: Subscription;
    constructor(private loadingProvider: LoadingProvider,
                private alertProvider: AlertProvider,
                private router: Router,
                private formBuilder: FormBuilder,
                private authService: AuthService,
                private events: Events,
                private datePipe: DatePipe,
                private userService: UsersService,
                private logService: LogService,
                private fcmService: FcmService) {
        this.rForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            name: ['', [Validators.required, Validators.minLength(3)]],
                password: ['', [Validators.required, Validators.compose([
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
                ])]],
                confirmPassword: [null, Validators.compose([Validators.required])]
            },
            {
                validator: CustomValidators.passwordMatchValidator
            });
    }
    ngOnDestroy(): void {
        if (this.sub != null){
            this.sub.unsubscribe();
        }
    }

    ngOnInit() {
    }

    async register() {
        const email = this.rForm.controls.email.value;
        const pwd = this.rForm.controls.password.value;
        const name = this.rForm.controls.name.value;
        const loader = await this.loadingProvider.create();
        await loader.present();
        this.authService.signUp(email, pwd).then(r => loader.dismiss().then(() => {
            if (r) {
                const log = new LogModel();
                log.userId = r.user.uid;
                log.device = this.authService.device;
                log.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
                this.sub = forkJoin([this.authService.updateUser(r.user, name), this.logService.addModel(log)])
                    .subscribe(results => {
                        const user = new UserModel(r.user);
                        user.displayName = name;
                        user.id = user.uid;
                        if (Capacitor.platform !== 'web') {
                            user.tokens = [this.fcmService.deviceToken];
                            this.userService.update(user);
                        }
                        this.authService.user = user;
                        this.authService.isAuthenticated = true;
                        this.events.publish('reg-success');
                        this.router.navigateByUrl('/tabs/home');
                    });
            } else {
                this.alertProvider.present('register fail!');
            }
        }), error => loader.dismiss().then(() => this.alertProvider.present(error)));
    }

    onToggle() {
        this.isShow = !this.isShow;
    }

    onToggle1() {
        this.isShow1 = !this.isShow1;
    }

}
