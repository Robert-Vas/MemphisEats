import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollDetail } from '@ionic/core';
import { Events, IonContent, MenuController } from '@ionic/angular';
import { CartModel, FILTERSMultiple, MealsModel, DishesModel, LocationsModel } from '../../shared/model';
import { AnimationProvider, CartDataService, PageDataService, ToastProvider, MealsService } from '../../shared';
import { animate, style, transition, trigger } from '@angular/animations';
import { Observable, Subscription } from 'rxjs';


@Component({
    selector: 'app-meals-list',
    templateUrl: './meals-list.page.html',
    styleUrls: ['./meals-list.page.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('cartState', [
            transition(':enter', [
                style({ transform: 'translateY(100%)' }),
                animate(300)
            ]),
            transition(':leave', [
                animate(300, style({ transform: 'translateY(100%)' }))
            ])
        ]),
        trigger('flyInCart', [
            transition('void => *', animate('200ms ease-in'))
        ])
    ]
})
export class MealsListPage implements OnInit, OnDestroy {
    @ViewChild(IonContent, { static: true }) content: IonContent;
    isActive = false;
    mealsList: Array<MealsModel>;
    twoWeeksOut = [];
    isHiddenMultiple = true;
    filterType = 1;
    multipleList = FILTERSMultiple;
    selectBtnIndex = 0;
    btnList = [
        { id: 1, name: 'Multiple' },
        { id: 2, name: 'New' },
        { id: 3, name: 'Hot' },
        { id: 4, name: 'Filter' },
    ];
    isEnd = false;
    bottom = 0;
    left = 0;
    isAdd = false;
    isShow = false;
    list1 = [];
    total: Observable<number>;
    cartState = 'inactive';
    cart$: Observable<CartModel[]>;
    isLoading = true;
    sub: Subscription;

    constructor(private route: ActivatedRoute,
                private mealsService: MealsService,
                private pageService: PageDataService,
                private pageCartService: CartDataService,
                private toastProvider: ToastProvider,
                private router: Router,
                private aProvider: AnimationProvider,
                private menu: MenuController,
                private events: Events) {
        this.total = this.pageCartService.getNum$();
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit() {
        this.getTwoWeeks();
    }

    getTwoWeeks() {
        const curr = new Date();
        const datestrings = [];
        for (let i = 1; i <= 14; i++) {
            const first = curr.getDate() - curr.getDay() + i
            const day = new Date(curr.setDate(first))
            if (day.getDay() > 0 && day.getDay() < 6) {
                this.twoWeeksOut.push(day)
                datestrings.push(day.getMonth() + '-' + day.getDay() + '-' + day.getFullYear());
            }
        }
        this.getList(datestrings);
    }


    toggle() {
        this.isActive = !this.isActive;
    }

    getList(datestrings) {
        this.sub = this.mealsService.getFullList().subscribe(meals => {
            this.mealsList = meals;
            this.mealsList.filter(item => item.dates_available.some(ai => datestrings.includes(ai)))
            this.isLoading = false;
        });

    }

    search(event) {
        const key = event.target.value;
        // this.mealsList = this.gList.filter(item => item.description_en.toLowerCase().includes(datestrings));
    }

    onShow() {
        this.cart$ = this.pageCartService.cart$;
        this.isShow = !this.isShow;
    }

    addCart(event, meal: MealsModel) {
        event.stopPropagation();
        const cart = new CartModel(meal);
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
