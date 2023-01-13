import { Product } from './../../../../../../../libs/products/src/lib/models/product';
import { ProductService } from './../../../../../../../libs/products/src/lib/services/products.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "admin-products-list",
  templateUrl: "./products-list.component.html",
  styles: []
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct() {
    console.log();

  }

  updateProduct() {
    console.log();
  }



}

