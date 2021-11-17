import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import {SessionStorage} from 'ngx-store';
import { UserModel } from "../../shared";
import { AlertController } from "@ionic/angular";



import {
  CartDataService,
  FavoriteService,
  DishesService,
  FavoriteModel,
  DishesModel,
  GlobalProvider,
  Toast1Provider,
  CartModel,
  AlertProvider,
  AuthService,
} from "../../shared";

@Component({
  selector: "app-dish-detail",
  templateUrl: "./dish-detail.page.html",
  styleUrls: ["./dish-detail.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DishDetailPage implements OnInit, OnDestroy {
  @SessionStorage() user: UserModel;
  id: string;
  date: string;
  detail: DishesModel;
  count = 1;
  isApp = false;
  isLoggedin = false;
  total: string;
  opened = {};
  sub: Subscription;
  matchedAllergens: string[] = [];
  
  
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dishesService: DishesService,
    private favoriteService: FavoriteService,
    private cartService: CartDataService,
    private authService: AuthService,
    private toast1Provider: Toast1Provider,
    private gProvider: GlobalProvider,
    private alertProvider: AlertProvider,
    private alertCtrl: AlertController
  ) {
    const snapshot = this.route.snapshot;
    this.id = snapshot.paramMap.get("id");
    this.date = snapshot.queryParamMap.get("date");
    this.isApp = this.gProvider.isApp;
  }

  ngOnInit(): void {
    this.isLoggedin = this.authService.isAuthenticated;
    this.sub = this.dishesService.getDishesByIds([this.id]).subscribe(dishes => {
      this.detail = dishes[0];
    });
    if(this.isLoggedin){
      this.dishesService.getDishesByIds([this.id]).subscribe(dishes => {  
        dishes[0].allergens.forEach(dishAllergen => {
          this.user.allergens.forEach(userAllergern => {
           if(userAllergern == (dishAllergen ? dishAllergen.id : "") ) {   
              this.matchedAllergens.push((dishAllergen ? dishAllergen.name_en : ""));        
           }
          })
        })
  
        if(this.matchedAllergens.length > 0) this.showAlert(this.matchedAllergens);
        
      });
    }
    
    


    
    
  }
  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  change(num: number) {
    this.total = (this.detail.price * num).toFixed(2);
  }

  toggleFunc(name: string) {
    this.opened[name] = !this.opened[name];
  }

  addFavorite() {
    if (!this.authService.isAuthenticated) {
      this.alertProvider.present("please login");
      return;
    }
    const model = new FavoriteModel();
    model.userId = this.authService.user.uid;
    model.dishId = this.detail.id;
    model.date = (new Date()).toJSON();
    
    this.favoriteService.addModel(model).then((d) => {
      this.detail.isFavorite = true;
    });
  }

  addCart(content: any) {
    const cart = new CartModel(this.detail);
    cart.isCheck = true;
    cart.num = this.count;
    cart.readyOn = this.date;

    this.cartService.addItemToCart(cart);
    this.toast1Provider.showCustomIcon(content);
  }

  buy() {
    const cart = new CartModel(this.detail);
    cart.isCheck = true;
    cart.num = this.count;

    this.cartService.addItemToCart(cart);
    this.router.navigateByUrl("/cart");
  }

  removeFavorite() {
    if (!this.authService.isAuthenticated) {
      this.alertProvider.present("please login");
      return;
    }
    
    this.favoriteService.delete(this.detail.id).then(_ => {
      this.detail.isFavorite = false;
    });
  }
  async showAlert(allergyList:String[] ) { 
    
    const alert = await this.alertCtrl.create({ 
    header: 'Caution', 
    subHeader: 'This dish contains these ingredients', 
    message:  allergyList.join(", "),
    buttons: ['OK'] 
    }); 
    await alert.present(); 
    const result = await alert.onDidDismiss();  
    console.log(result); 
    }


}