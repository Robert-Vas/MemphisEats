import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';

@Component({
    selector: 'app-slides',
    templateUrl: './slides.page.html',
    styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {
    list = [
        // {title: 'Fruit Bouquets Coupons', img: 'assets/img/slides/1.jpg'},
       // {title: '$20 off Fruit Promo Codes', img: 'assets/img/slides/2.jpg'},
        {title: '', img: 'assets/img/slides/3.jpg'}
    ];
    @ViewChild(IonSlides, {static: true}) slides: IonSlides;
    isEnd = false;

    constructor() {
    }

    ngOnInit() {
    }

    onReachEnd() {
        this.isEnd = true;
    }

}
