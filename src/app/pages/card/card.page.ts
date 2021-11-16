import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.page.html',
    styleUrls: ['./card.page.scss']
})
export class CardPage implements OnInit {
    list = [
        {
            name: 'Isabella ',
            title: 'Goldman Sachs',
            content: '5104889884312034',
            img: 'assets/img/my/card1.png',
            type: 'Visa',
            cvv2: 453,
            date: '06/2024',
            active: false
        },
        {
            name: 'Olivia',
            title: 'Commonwealth Bank',
            content: '5206882680112051',
            img: 'assets/img/my/card1.png',
            type: 'MasterCard',
            cvv2: 271,
            date: '06/2022',
            active: false
        },
        {
            name: 'Samantha ',
            title: 'Bank of Montreal',
            content: '4539683305684453',
            img: 'assets/img/my/card1.png',
            type: 'Visa',
            cvv2: 232,
            date: '06/2029',
            active: false
        },
        {
            name: 'Alexis ',
            title: 'The Bank of New York Mellon',
            content: '5198288219195932',
            img: 'assets/img/my/card1.png',
            type: 'Visa',
            cvv2: 777,
            date: '06/2026',
            active: false
        },
        {
            name: 'Ashley ',
            title: 'Shinhan Bank',
            content: '4485218109015028',
            img: 'assets/img/my/card1.png',
            type: 'Visa',
            cvv2: 352,
            date: '06/2021',
            active: false
        },
    ];

    constructor() {
    }

    ngOnInit() {
    }
}
