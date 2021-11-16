import {Component, HostBinding, Input} from '@angular/core';

@Component({
    selector: 'custom-skeleton-img',
    templateUrl: './custom-skeleton-img.component.html',
    styleUrls: ['./custom-skeleton-img.component.scss'],
})
export class CustomSkeletonImgComponent {
    img = '';

    @HostBinding('class.img-loaded') imageLoaded = false;

    @Input()
    set src(val: string) {
        this.img = (val !== undefined && val !== null) ? val : '';
    }

    constructor() {
    }

    onImgLoad() {
        this.imageLoaded = true;
    }
}
