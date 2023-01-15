import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductService } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: "admin-products-list",
  templateUrl: "./products-list.component.html",
  styles: []
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.productService.deleteProduct(productId)
          .subscribe(
            (response) => {
              this._getProducts();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Product is deleted!'
              }),
                (error: any) => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Product is not deleted!'
                  });
                }
            }
          )
      },
    });

  }

  updateProduct(productId: Product) {
    this.router.navigateByUrl(`products/form/${productId}`)
  }

}

