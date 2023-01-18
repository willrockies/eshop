import { Order, OrdersService } from '@bluebits/orders';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "admin-orders-list",
  templateUrl: "./orders-list.component.html",
  styleUrls: ["./orders-list.component.scss"]
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private ordersService: OrdersService) {

  }
  ngOnInit(): void {
    this._getOrders();
  }

  _getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  deleteOrder(orderId: Order) { }
  showOrder(orderId: Order) { }
}
