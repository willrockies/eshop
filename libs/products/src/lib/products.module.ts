import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { OrdersModule } from '@bluebits/orders';
import { UiModule } from '@bluebits/ui';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';

import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';

const ROUTES: Routes = [
  {
    path: "products",
    component: ProductsListComponent
  },
  {
    path: "category/:categoryid",
    component: ProductsListComponent
  },
  {
    path: "products/:productid",
    component: ProductPageComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    OrdersModule,
    RouterModule.forChild(ROUTES),
    ButtonModule,
    CheckboxModule,
    RatingModule,
    InputNumberModule,
    FormsModule,
    UiModule
  ],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductPageComponent
  ],
  exports: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent]
})
export class ProductsModule { }
