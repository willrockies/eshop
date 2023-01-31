import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';

import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartService } from './services/cart.service';

@NgModule({
  imports: [CommonModule, RouterModule, BadgeModule],
  declarations: [CartIconComponent],
  exports: [CartIconComponent]
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
