import { takeUntil, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Product, ProductService } from '@bluebits/products';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { CartItem, CartService } from '@bluebits/orders';

@Component({
  selector: "products-product-page",
  templateUrl: "./product-page.component.html",
  styles: []
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product;
  quantity = 1;
  endSubscription$: Subject<any> = new Subject();

  constructor(
    private prodService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['productid']) {
        this._getProduct(params['productid']);
      }
    });
  }

  ngOnDestroy(): void {
    this.endSubscription$.complete();
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    }
    this.cartService.setCartItem(cartItem);
  }

  private _getProduct(id: string) {
    this.prodService.getProduct(id).pipe(takeUntil(this.endSubscription$)).subscribe(resProduct => {
      this.product = resProduct
    });
  }
}
