import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { OrdersModule } from '@bluebits/orders';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';

const ROUTES: Routes = [
  {
    path: 'products',
    component: ProductsListComponent,
  },
  {
    path:'category/:categoryid',
    component:ProductsListComponent
  }
]
@NgModule({
  imports: [CommonModule, OrdersModule, RouterModule.forChild(ROUTES), ButtonModule, CheckboxModule, FormsModule],
  declarations: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent, ProductsListComponent],
  exports: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent]
})
export class ProductsModule { }
