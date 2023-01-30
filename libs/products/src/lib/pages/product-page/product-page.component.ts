import { takeUntil, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Product, ProductService } from '@bluebits/products';
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "products-product-page",
  templateUrl: "./product-page.component.html",
  styles: []
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product;
  quantity: number;
  endSubscription$: Subject<any> = new Subject();

  constructor(
    private prodService: ProductService,
    private route: ActivatedRoute) { }

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

  } 

  private _getProduct(id: string) {
    this.prodService.getProduct(id).pipe(takeUntil(this.endSubscription$)).subscribe(resProduct => {
      this.product = resProduct
    });
  }
}
