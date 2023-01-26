import { ProductService } from '@bluebits/products';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@bluebits/orders';
import { UsersService } from '@bluebits/users';
import { environment } from '@env/environment';
import { combineLatest } from 'rxjs';

@Component({
  selector: "admin-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  statistics = []

  constructor(
    private userService: UsersService,
    private productService: ProductService,
    private ordersService: OrdersService) { }
  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales(),
    ]).subscribe((values) => {
      this.statistics = values;
    });
  }



}
