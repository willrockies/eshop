import { Order, OrdersService } from '@bluebits/orders';
import { Component, OnInit } from "@angular/core";

const ORDER_STATUS = {
  0 : {
    label: 'Pending',
    color: 'success'
  },
  1 : {
    label: 'Processed',
    color: 'warning'
  },
  2 : {
    label: 'Shipped',
    color: 'warning'
  },
  3 : {
    label: 'Shipped',
    color: 'success'
  },
  4 : {
    label: 'Cancelled',
    color: 'danger'
  },
}


@Component({
  selector: "admin-orders-list",
  templateUrl: "./orders-list.component.html",
  styleUrls: ["./orders-list.component.scss"]
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
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
