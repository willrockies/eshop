import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductService } from '@bluebits/products';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: "products-list",
  templateUrl: "./products-list.component.html",
  styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  endSubscription$: Subject<any> = new Subject();
  categories: Category[] = [];
  isCategoryPage: boolean;

  constructor(
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params['categoryid'] ? this._getProducts([params['categoryid']]) : this._getProducts();
      params['categoryid'] ? this.isCategoryPage = true : this.isCategoryPage = false
    });

    this._getCategories();
  }
  ngOnDestroy(): void {
    this.endSubscription$.complete();
  }


  private _getProducts(categoriesFilter?: string[]) {
    this.productService.getProducts(categoriesFilter)
      .subscribe(resProducts => {
        this.products = resProducts
      });
  }

  private _getCategories() {
    this.categoriesService.getCategories()
      .pipe(takeUntil(this.endSubscription$))
      .subscribe(resCategories => {
        this.categories = resCategories;
      });
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter(category => category.checked)
      .map(category => category.id);

    this._getProducts(selectedCategories);

  }
}
