import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {AlertProvider, LoadingProvider} from '../../shared/providers';
import {Router} from '@angular/router';
import {AuthService, UsersService, ProfileFieldsService, AllergensService} from '../../shared/fapi';
import {LogModel, UserModel, ProfileFieldsModel, AllergensModel} from '../../shared/model';
import {Events} from '@ionic/angular';
import {DatePipe} from '@angular/common';
import {SessionStorage} from 'ngx-store';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfilePage implements OnInit, OnDestroy {
    @SessionStorage() user: UserModel;
    profileForm: FormGroup;
    isShow = false;
    isShow1 = false;
    isLoading = false;
    profileFields = {};
    selectedAllergens: string[] = [];
    allergensList: Array<AllergensModel>;
    profileFieldsList: Array<ProfileFieldsModel>;
    sub: Subscription;
    constructor(private loadingProvider: LoadingProvider,
                private alertProvider: AlertProvider,
                private router: Router,
                private fb: FormBuilder,
                private authService: AuthService,
                private events: Events,
                private usersService: UsersService,
                private allergensService: AllergensService,
                private profileFieldsService: ProfileFieldsService
                ) {
        this.profileForm = this.fb.group({
            zip: ['', [Validators.required, Validators.minLength(5)]],
            fullName: ['', [Validators.required, Validators.minLength(3)]],
            displayName: ['', [Validators.required, Validators.minLength(3)]]
            });
        }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit() {
        //console.log(this.user);
        if (this.user.zip) {
            this.profileForm.get('zip').setValue(this.user.zip);
        }

        if (this.user.fullName) {
            this.profileForm.get('fullName').setValue(this.user.fullName);
        }

        if (this.user.displayName) {
            this.profileForm.get('displayName').setValue(this.user.displayName);
        }

        if (this.user.allergens) {
        this.selectedAllergens = this.user.allergens;
        }

        if (this.user.profile) {
        this.profileFields = this.user.profile;
        }

        this.sub.add(this.allergensService.getList().subscribe(r => {
            this.allergensList = r;
        }));

        this.sub.add(this.profileFieldsService.getList().subscribe(r => {
            this.profileFieldsList = r;
            for (const list of r) {
                this.profileForm.addControl(list.id, new FormControl(0, Validators.required));
                if (list.id in this.profileFields) {
                    this.profileForm.get(list.id).setValue(this.profileFields[list.id]);
                }
            }
        }));

    }

    onOk() {
        this.isLoading = true;
        const model = new UserModel();

        //console.log(this.selectedAllergens);

        model.zip = this.profileForm.controls.zip.value;
        model.fullName = this.profileForm.controls.fullName.value;
        model.displayName = this.profileForm.controls.displayName.value;
        model.allergens = this.selectedAllergens;


        for (const list of this.profileFieldsList) {
            this.profileFields[list.id] = parseFloat(this.profileForm.controls[list.id].value);
        }

        model.profile = this.profileFields;

        model.id = this.user.id;
        this.usersService.update(model).then(() => {
            this.user = model;
            this.alertProvider.present('Profile Updated Successfully!');
        });
    }

    onToggle() {
        this.isShow = !this.isShow;
    }

    onToggle1() {
        this.isShow1 = !this.isShow1;
    }

}
