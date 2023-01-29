import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@bluebits/products';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: "products-categories-banner",
  templateUrl: "./categories-banner.component.html",
  styleUrls: ["./categories-banner.component.scss"]
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  endSubscription$: Subject<any> = new Subject();

  constructor(private categoriesService: CategoriesService) { }


  ngOnInit(): void {
    this.categoriesService.getCategories()
      .pipe(takeUntil(this.endSubscription$))
      .subscribe(categories => {
        this.categories = categories;
      })
  }

  ngOnDestroy(): void {
    //  this.endSubscription$.next();
    this.endSubscription$.complete();
  }

}
