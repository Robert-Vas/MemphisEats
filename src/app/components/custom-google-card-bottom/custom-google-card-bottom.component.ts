import {Component, Input, OnInit} from '@angular/core';
import {CustomGoogleCardModel} from './custom-google-card.model';

@Component({
    selector: 'custom-google-card-bottom',
    templateUrl: './custom-google-card-bottom.component.html',
    styleUrls: ['./custom-google-card-bottom.component.scss'],
})
export class CustomGoogleCardBottomComponent implements OnInit {
    @Input() list: Array<CustomGoogleCardModel>;

    constructor() {
    }

    ngOnInit() {
    }

}
