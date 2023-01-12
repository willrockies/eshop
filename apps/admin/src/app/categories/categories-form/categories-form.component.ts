import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: "admin-categories-form",
  templateUrl: "./categories-form.component.html",
  styles: []
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],

    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
    }
    this.categoryService.createCategory(category).subscribe(response => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Category Created'
      });
      timer(2000).toPromise().then(done => {
        this.location.back()
      })

    },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category was not created' });

      })
  }

  get categoryForm() {
    return this.form.controls
  }

}
