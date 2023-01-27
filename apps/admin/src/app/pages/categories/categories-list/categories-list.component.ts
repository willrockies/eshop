import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: "admin-categories-list",
  templateUrl: "./categories-list.component.html",

})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubscription$: Subject<any> = new Subject;

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }


  ngOnInit(): void {
    this._getCategories();
  }

  ngOnDestroy(): void {
    this.endSubscription$.complete();
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.categoriesService.deleteCategory(categoryId)
          .subscribe(
            () => {
              this._getCategories();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Category is deleted!'
              }),
                () => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Category is not deleted!'
                  });
                }
            }
          )
      },
    });
  }

  updateCategory(categoryId: Category) {
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

  private _getCategories() {
    this.categoriesService.getCategories()
      .pipe(takeUntil(this.endSubscription$))
      .subscribe(cats => {
        this.categories = cats;

      })
  }

}
