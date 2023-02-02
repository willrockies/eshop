import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "orders-cart-page",
  templateUrl: "./cart-page.component.html",
  styleUrls: ["./cart-page.component.scss"]
})
export class CartPageComponent implements OnInit {
  constructor(private router: Router) { }

  quantity = 1;
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  backToShop() {
    this.router.navigate(['/products'])
  }
  DeleteCartItem() { }
}
