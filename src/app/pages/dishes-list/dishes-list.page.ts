import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ScrollDetail} from '@ionic/core';
import {Events, IonContent, MenuController} from '@ionic/angular';
import {CartModel, FILTERSMultiple, DishesModel} from '../../shared/model';
import {AnimationProvider, CartDataService, PageDataService, ToastProvider, DishesService} from '../../shared';
import {animate, style, transition, trigger} from '@angular/animations';
import { Observable, Subscription } from 'rxjs';


@Component({
    selector: 'app-dish-list',
    templateUrl: './dishes-list.page.html',
    styleUrls: ['./dishes-list.page.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('cartState', [
            transition(':enter', [
                style({transform: 'translateY(100%)'}),
                animate(300)
            ]),
            transition(':leave', [
                animate(300, style({transform: 'translateY(100%)'}))
            ])
        ]),
        trigger('flyInCart', [
            transition('void => *', animate('200ms ease-in'))
        ])
    ]
})
export class DishesListPage implements OnInit, OnDestroy {
    @ViewChild(IonContent, {static: true}) content: IonContent;
    isActive = false;
    list: Array<DishesModel>;
    gList: Array<DishesModel>;
    cate: string;
    isHiddenMultiple = true;
    filterType = 1;
    multipleList = FILTERSMultiple;
    selectBtnIndex = 0;
    btnList = [
        {id: 1, name: 'Multiple'},
        {id: 2, name: 'New'},
        {id: 3, name: 'Hot'},
        {id: 4, name: 'Filter'},
    ];
    isEnd = false;
    bottom = 0;
    left = 0;
    isAdd = false;
    isShow = false;
    list1 = [];
    total$: Observable<number>;
    cartState = 'inactive';
    cart$: Observable<CartModel[]>;
    isLoading = true;
    sub: Subscription;

    constructor(private route: ActivatedRoute,
                private goodService: DishesService,
                private pageService: PageDataService,
                private pageCartService: CartDataService,
                private toastProvider: ToastProvider,
                private router: Router,
                private aProvider: AnimationProvider,
                private menu: MenuController,
                private events: Events) {
        this.cate = this.route.snapshot.paramMap.get('cateId') || 'all';
        this.total$ = this.pageCartService.getNum$();
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit() {
        this.getList();
    }

    toggle() {
        this.isActive = !this.isActive;
    }

    getList() {
        this.sub = this.goodService.getList().subscribe(result => {
            this.gList = result;
            this.list = this.gList;
            this.isLoading = false;
        });
    }

    search(event) {
        const key = event.target.value;
        this.list = this.gList.filter(item => item.name_en.toLowerCase().includes(key.toString().toLowerCase()));
    }

    onShow() {
        this.cart$ = this.pageCartService.cart$;
        this.isShow = !this.isShow;
    }

    addCart(event, dish: DishesModel) {
        event.stopPropagation();
        const cart = new CartModel(dish);
        cart.num = 1;
        cart.isCheck = true;
        this.pageCartService.addItemToCart(cart);
        this.list1.push(1);
        this.left = event.target.getBoundingClientRect().left;
        this.bottom = event.target.getBoundingClientRect().bottom;
    }

    onFilter(id: number, index: number) {
    /*
        this.selectBtnIndex = index;
        if (id === 1) {
            this.isHiddenMultiple = !this.isHiddenMultiple;
        }
        if (id === 2) {
            this.isHiddenMultiple = true;
            this.list = this.gList.filter(g => g.isNew);
        }
        if (id === 3) {
            this.isHiddenMultiple = true;
            this.list = this.gList.filter(g => g.isHot);
        }
        if (id === 4) {
            this.isHiddenMultiple = true;
            this.onSearch();
        }
    */
    }

    onSearch() {
        this.menu.enable(true, 'search');
        this.menu.open('search');
    }

    selectMultiple(name: string, type: number) {
         /*
        try {
            this.btnList.map(b => {
                if (b.id === 1) {
                    b.name = name;
                }
            });
            this.isHiddenMultiple = true;
            switch (type) {
                case 1:
                    this.list = this.gList.sort((a, b) => b.sort - a.sort);
                    break;
                case 2:
                    this.list = this.gList.sort((a, b) => a.price - b.price);
                    break;
                case 3:
                    this.list = this.gList.sort((a, b) => b.price - a.price);
                    break;
                default:
                    this.list = this.gList.sort((a, b) => b.sort - a.sort);
                    break;
            }
        } catch (e) {
            console.log(e);
        }
        */
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

    goCart() {
        this.router.navigateByUrl('/cart');
    }

    onClear() {
        this.pageCartService.clear();
    }

    animation(i) {
        return this.aProvider.scaleInCenter(i);
    }

    animationStarted(event) {
        const el = event.element;
        el.style.transform = `translate3d(0,${29 + this.bottom - window.innerHeight}px,0)`;
        el.children[0].style.transform = `translate3d(${this.left - 22}px,0,0)`;
        el.children[0].style.opacity = 0;
    }

    animationDone(event: any) {
        const el = event.element;
        el.style.transform = `translate3d(0,0,0)`;
        el.children[0].style.transform = `translate3d(0,0,0)`;
        el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
        el.children[0].style.transition = 'transform .55s linear';
        el.children[0].style.opacity = 1;
        this.isAdd = true;
        el.children[0].addEventListener('transitionend', () => {
            this.isAdd = false;
            this.list1 = [];
        });
        el.children[0].addEventListener('webkitAnimationEnd', () => {
            this.isAdd = false;
            this.list1 = [];
        });
    }


}
