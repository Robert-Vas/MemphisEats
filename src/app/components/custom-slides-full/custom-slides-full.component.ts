import {Component, Input} from '@angular/core';
import {SlidesFullModel} from './slides-full-model';

@Component({
    selector: 'custom-slides-full',
    templateUrl: './custom-slides-full.component.html',
    styleUrls: ['./custom-slides-full.component.scss'],
})
export class CustomSlidesFullComponent {
    @Input() list: Array<SlidesFullModel>;

    constructor() {
    }

}
