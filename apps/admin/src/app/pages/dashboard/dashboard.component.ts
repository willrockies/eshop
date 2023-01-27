import { ProductService } from '@bluebits/products';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order, OrdersService } from '@bluebits/orders';
import { UsersService } from '@bluebits/users';
import { environment } from '@env/environment';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: "admin-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  statistics = [];
  endSubscription$: Subject<any> = new Subject;

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
    ]).pipe(takeUntil(this.endSubscription$))
      .subscribe((values) => {
        this.statistics = values;
      });
  }

  ngOnDestroy(): void {
    this.endSubscription$.complete();
  }




}
