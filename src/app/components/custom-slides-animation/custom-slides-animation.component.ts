import {Component, Input, OnInit} from '@angular/core';
import {slideOptsFlip, slidesOptsCoverflow, slidesOptsCube, slidesOptsFade} from './custom-slides-animation-model';

@Component({
    selector: 'custom-slides-animation',
    templateUrl: './custom-slides-animation.component.html',
    styleUrls: ['./custom-slides-animation.component.scss']

})
export class CustomSlidesAnimationComponent implements OnInit {
    slideOpts: any;
    @Input() list: Array<any>;
    @Input() animation = 'Coverflow';
    @Input() isFull = false;

    constructor() {
    }

    ngOnInit(): void {
        switch (this.animation) {
            case 'coverflow':
                this.slideOpts = slidesOptsCoverflow;
                break;
            case 'cube':
                this.slideOpts = slidesOptsCube;
                break;
            case 'fade':
                this.slideOpts = slidesOptsFade;
                break;
            case 'flip':
                this.slideOpts = slideOptsFlip;
                break;
            default:
                this.slideOpts = 'none';
        }
    }
}
