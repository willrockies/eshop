import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductService } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: "admin-products-list",
  templateUrl: "./products-list.component.html",
  styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  endSubscription$: Subject<any> = new Subject;
  constructor(
    private productService: ProductService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy(): void {
    this.endSubscription$.complete();
  }

  private _getProducts() {
    this.productService.getProducts().pipe(takeUntil(this.endSubscription$)).subscribe((products) => {
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

