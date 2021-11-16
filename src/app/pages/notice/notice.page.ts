import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {ScrollDetail} from '@ionic/core';
import { Subscription } from 'rxjs';
import {
    NoticeModel,
    NoticeService,
    AnimationProvider
} from '../../shared';

@Component({
    selector: 'app-notice',
    templateUrl: './notice.page.html',
    styleUrls: ['./notice.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NoticePage implements OnInit, OnDestroy {
    @ViewChild(IonContent, {static: true}) content: IonContent;
    list: Array<NoticeModel>;
    isEnd = false;
    sub: Subscription;


    constructor(private aProvider: AnimationProvider,
                private noticeService: NoticeService) {
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit() {
        this.sub = this.noticeService.getList().subscribe(r => this.list = r);
    }

    animation(i) {
        return this.aProvider.slideInBlurredBottom(i);
    }

    onScroll($event: CustomEvent<ScrollDetail>) {
        if ($event && $event.detail && $event.detail.scrollTop) {
            const scrollTop = $event.detail.scrollTop;
            this.isEnd = scrollTop >= 10;
        }
    }

    goTop() {
        this.content.scrollToTop(2000);
    }

    doReorder(ev: any) {
        console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
        ev.detail.complete();
    }


}
