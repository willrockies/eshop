import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { CategoriesService, Category, Product, ProductService } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: "admin-products-form",
  templateUrl: "./products-form.component.html",
  styles: []
})
export class ProductsFormComponent implements OnInit {
  editMode = false;
  isSubmitted = false;
  categories: Category[] = [];
  imageDisplay: string | ArrayBuffer;
  currentProductId: string;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productService: ProductService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],

    })
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories
    })
  }
  private _addProduct(productData: FormData) {
    this.productService.createProduct(productData)
      .subscribe((product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${product.name} Created`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back()
          })

      }, () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product was not created' });

      })
  }

  private _updateProduct(productFormData: FormData){
    this.productService.updateProduct(productFormData, this.currentProductId)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product updated`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back()
          })

      }, () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product was not updated' });

      })
  }
  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.editMode = true;
        this.currentProductId = params["id"];
        this.productService.getProduct(params["id"]).subscribe((product) => {
          this.productForm["name"].setValue(product.name);
          this.productForm["brand"].setValue(product.brand);
          this.productForm["price"].setValue(product.price);
          this.productForm["category"].setValue(product.category.id);
          this.productForm["countInStock"].setValue(product.countInStock);
          this.productForm["isFeatured"].setValue(product.isFeatured)
          this.productForm["richDescription"].setValue(product.richDescription);
          this.productForm["description"].setValue(product.description);
          this.imageDisplay = product.image;
          this.productForm["image"].setValidators([]);
          this.productForm["image"].updateValueAndValidity();
          //this.productForm["image"].setValue(product.image);
        })
      }
    })
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData;

    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });

    if (this.editMode) {
      this._updateProduct(productFormData);

    } else {
      this._addProduct(productFormData)
    }


  }
  onCancel() {
    this.location.back();
   }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        //if (typeof fileReader.result === 'string')
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }
  }

  get productForm() {
    return this.form.controls;
  }
}
