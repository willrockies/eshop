import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@bluebits/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import * as countriesLib from 'i18n-iso-countries';

declare const require;

@Component({
  selector: "admin-users-form",
  templateUrl: "./users-form.component.html",
  styleUrls: ["./users-form.component.scss"]
})
export class UsersFormComponent implements OnInit {
  editMode = false;
  isSubmitted = false;
  countries = [];
  currentUserId: string;
  val4: string;
  users: User[];
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this._initForm();
    this._getUsers();
    this._checkEditMode();
    this._getCountries();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: ['', Validators.required],
      street: [''],
      apartment: [''],
      zip: ['', Validators.required],
      city: [''],
      country: ['', Validators.required],

    })
  }

  private _getUsers() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users
    })
  }

  private _addProduct(user: User) {
    this.usersService.createuser(user)
      .subscribe((user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} Created`
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
  private _updateProduct(user: User) {
    this.usersService.updateuser(user)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `user updated`
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
        this.currentUserId = params["id"];
        this.usersService.getuser(params["id"]).subscribe((user) => {
          this.userForm["name"].setValue(user.name);
          this.userForm["email"].setValue(user.email);
          this.userForm["password"].setValue(user.password);
          this.userForm["phone"].setValue(user.phone);
          this.userForm["isAdmin"].setValue(user.isAdmin);
          this.userForm["street"].setValue(user.street);
          this.userForm["apartment"].setValue(user.apartment);
          this.userForm["zip"].setValue(user.zip);
          this.userForm["city"].setValue(user.city);
          this.userForm["country"].setValue(user.country);
          this.userForm["password"].setValidators([]);
          this.userForm["password"].updateValueAndValidity();

        })
      }
    })
  }

  private _getCountries() {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesLib.getNames("en", { select: "official" })).map(entry => {
      return{

        id:entry[0],
        name: entry[1]
      }
    });
    console.log(this.countries);

  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const user: User = {
      id: this.currentUserId,
      name: this.userForm['name'].value,
      email: this.userForm['email'].value,
      password: this.userForm['password'].value,
      phone: this.userForm['phone'].value,
      isAdmin: this.userForm['isAdmin'].value,
      street: this.userForm['street'].value,
      apartment: this.userForm['apartment'].value,
      zip: this.userForm['zip'].value,
      city: this.userForm['city'].value,
      country: this.userForm['country'].value,
    }

    if (this.editMode) {
      this._updateProduct(user);

    } else {
      this._addProduct(user);
    }

  }
  onCancel() {
    this.location.back();

  }

  get userForm() {
    return this.form.controls
  }
}
