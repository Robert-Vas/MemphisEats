import {Component, OnDestroy, OnInit} from '@angular/core';
import {NoticeModel} from '../../shared/model';
import {ModalController} from '@ionic/angular';
import {NoticeService} from '../../shared/fapi';
import { subscribeOn } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'custom-notice-slide',
    templateUrl: './custom-notice-slide.component.html',
    styleUrls: ['./custom-notice-slide.component.scss'],
})
export class CustomNoticeSlideComponent implements OnInit, OnDestroy {
    option = {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: (index, className) => '<span class="' + className + '">' + (index + 1) + '</span>',
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        }
    };
    noticeList: Array<NoticeModel>;
    sub: Subscription;

    constructor(private modalCtrl: ModalController,
                private noticeService: NoticeService) {
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit(): void {
        this.sub = this.noticeService.getList().subscribe(r => this.noticeList = r);
    }

    onClose() {
        this.modalCtrl.dismiss();
    }
}
