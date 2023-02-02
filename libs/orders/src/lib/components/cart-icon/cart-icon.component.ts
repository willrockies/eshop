import { CartService } from '@bluebits/orders';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "orders-cart-icon",
  templateUrl: "./cart-icon.component.html",
  styleUrls: ["./cart-icon.component.scss"]
})
export class CartIconComponent implements OnInit {

  cartCount: any = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart?.items.length ?? 0;

    })

  }

}
