import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
    GoodsModel,
    DishesModel,
    GoodsService,
    DishesService,
    OrderDetailModel,
    OrderDetailDishModel,
    OrderDetailService,
    OrderDetailDishService,
    OrderDetailView,
    OrderDetailDishView,
    OrderDishModel,
    OrderService,
    OrderDishService,
    PageDataService,
    Order
} from '../../shared';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.page.html',
    styleUrls: ['./order-detail.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OrderDetailPage {
    order: Order;
    orderDishModel: OrderDishModel;
    dList: Array<OrderDetailModel>;
    odishList: Array<OrderDetailDishModel>;
    gList: Array<GoodsModel>;
    dishList: Array<DishesModel>;
    detailList: Array<OrderDetailView>;
    detailDishList: Array<OrderDetailDishView>;
    list = [
        {title: 'Start', date: '2019-11-04 18:04:55', img: 'assets/img/line/1.jpg'},
        {title: 'Pay', date: '2019-11-04 19:04:55', img: 'assets/img/line/2.jpg'},
        {title: 'Process', date: '2019-11-04 19:06:55', img: 'assets/img/line/3.jpg'},
        {title: 'Delivery', date: '2019-11-05 20:04:33', img: 'assets/img/line/4.jpg'},
        {title: 'Finish', date: '2019-11-05 21:04:55', img: 'assets/img/line/5.jpg'}
    ];

    constructor(private route: ActivatedRoute,
                private orderService: OrderService,
                private goodService: GoodsService,
                private dService: OrderDetailService,
                private pService: PageDataService) {
        const id = this.route.snapshot.paramMap.get('id');
        this.pService.getList([this.orderService.getModel(id), this.dService.getListByParam('orderId', id),
            this.goodService.getList()]).then(results => {
            this.order = results[0];
            this.dList = results[1];
            this.gList = results[2];
            this.detailList = this.dList.map(d => {
                const good = this.gList.find(g => g.id === d.goodId);
                return ({img: good.img, name: good.name, ...d});
            });
        });
    }
    
    get orderTotal(): number {
        return this.order != null
            ? (this.order.paymentSummary.subtotal - this.order.paymentSummary.discount + this.order.paymentSummary.tax)
            : 0;
    }

}
