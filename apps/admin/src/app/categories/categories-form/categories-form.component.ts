import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "admin-categories-form",
  templateUrl: "./categories-form.component.html",
  styles: []
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff'],
    });

    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
      color: this.categoryForm['color'].value,
    }

    if (this.editMode) {
      this._updateCategory(category)
    } else {
      this._addCategory(category)
    }

  }

  private _addCategory(category: Category) {
    this.categoryService.createCategory(category).subscribe(response => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Category Created'
      });
      timer(2000).toPromise().then(done => {
        this.location.back()
      })

    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category was not created' });

    })
  }

  private _updateCategory(category: Category) {
    this.categoryService.updateCategory(category).subscribe(response => {
      this.messageService.add({
        severity: 'success',
        summary: 'Updated',
        detail: 'Category is Updated'
      });
      timer(2000).toPromise().then(done => {
        this.location.back()
      })

    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category was not updated' });

    })
  }

  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if (params["id"]) {
        this.editMode = true;
        this.currentCategoryId = params["id"];
        this.categoryService.getCategory(params["id"]).subscribe(category => {
          this.categoryForm["name"].setValue(category.name);
          this.categoryForm["icon"].setValue(category.icon);
          this.categoryForm["color"].setValue(category.color);

        })
      }
    })
  }

  get categoryForm() {
    return this.form.controls
  }

}
