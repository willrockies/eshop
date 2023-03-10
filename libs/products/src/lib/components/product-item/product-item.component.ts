import { CartItem, CartService } from '@bluebits/orders';
import { Product } from '@bluebits/products';
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "products-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"]
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;


  constructor(private cartService: CartService) { }


  ngOnInit(): void {
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    }
    console.log('teste')
    this.cartService.setCartItem(cartItem)

  }
}
