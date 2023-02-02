import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from "primeng/inputnumber";

import { CartIconComponent } from "./components/cart-icon/cart-icon.component";
import { CartService } from "./services/cart.service";
import { CartPageComponent } from "./pages/cart-page/cart-page.component";
const ROUTES: Routes = [
  {
    path: 'cart',
    component: CartPageComponent
  }
]
@NgModule({
  imports: [CommonModule, RouterModule, InputNumberModule, BadgeModule, ButtonModule, RouterModule.forChild(ROUTES)],
  declarations: [CartIconComponent, CartPageComponent],
  exports: [CartIconComponent]
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
