import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductService } from '@bluebits/products';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: "featured-products",
  templateUrl: "./featured-products.component.html",
  styleUrls: ["./featured-products.component.scss"]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {

  featuredProducts: Product[] = [];
  endSubscription$: Subject<any> = new Subject();

  constructor(private prodService: ProductService) {

  }
  ngOnInit(): void {
    this._getFeaturedProducts()
  }

  ngOnDestroy

  private _getFeaturedProducts() {
    this.prodService.getFeaturedProducts(4).pipe(takeUntil(this.endSubscription$)).subscribe(products => {
      this.featuredProducts = products;
    })
  }


}
