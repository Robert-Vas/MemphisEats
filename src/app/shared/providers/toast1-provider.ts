import {Injectable} from '@angular/core';
import {ToastService} from 'ng-zorro-antd-mobile';

@Injectable({providedIn: 'root'})
export class Toast1Provider {
    constructor(private toast: ToastService) {
    }

    show() {
        this.toast.info('Toast without mask !!!', 4000, null, false);
    }

    success(msg: string) {
        this.toast.success(msg, 3000, () => {
        });
    }

    fail(msg: string) {
        this.toast.fail(msg, 3000);
    }

    offline() {
        this.toast.offline('Network connection failed !!!', 1000);
    }

    loading() {
        this.toast.loading('Loading...', 3000, () => {
        });
    }

    showCustomIcon(event) {
        this.toast.info(event);
    }
}
