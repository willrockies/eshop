import { ORDER_STATUS } from './../../order.constants';
import { Cart, CartService, Order, OrdersService } from '@bluebits/orders';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UsersService } from '@bluebits/users';
import * as countriesLib from 'i18n-iso-countries';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { OrderItem } from '../../models/order-item';


declare const require;

@Component({
  selector: "orders-checkout-page",
  templateUrl: "./checkout-page.component.html",
  styleUrls: ["./checkout-page.component.scss"]
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  usersId = "638d30aed832c76caa13718a";
  countries = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    private cartService: CartService,
    private orderService: OrdersService) { }

  ngOnInit(): void {
    this._initForm();
    this._getCartItem();
    this._getCountries();
  }

  ngOnDestroy(): void {


  }

  private _initForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  private _getCountries() {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesLib.getNames("en", { select: "official" })).map(entry => {
      return {
        id: entry[0],
        name: entry[1]
      }
    });

  }

  _getCartItem() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      }
    });
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) return;

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['street'].value,
      shippingAddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city'].value,
      zip: this.checkoutForm['zip'].value,
      country: this.checkoutForm['country'].value,
      phone: this.checkoutForm['phone'].value,
      status: Object.keys(ORDER_STATUS)[0],
      user: this.usersId,
      dateOrdered: `${Date.now()}`

    }

    this.orderService.createOrder(order).subscribe(
      () => {
        this.cartService.emptyCart();
        this.router.navigate(['/success']);
      }, (error) => {
        //display some errors messages
        console.log(error);
      });

  }
  onCancel() {
    this.location.back();

  }

  backToCart() {
    this.router.navigate(['/cart']);

  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
