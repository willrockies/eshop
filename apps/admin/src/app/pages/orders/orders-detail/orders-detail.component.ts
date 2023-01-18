import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { Order, OrdersService } from "@bluebits/orders";

@Component({
  selector: "admin-orders-detail",
  templateUrl: "./orders-detail.component.html",
  styleUrls: ["./orders-detail.component.scss"]
})
export class OrdersDetailComponent implements OnInit {
  order: Order;
  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._getOrder();
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.orderService.getOrder(params["id"]).subscribe((order) => {
          console.log(order)
          this.order = order;
        })

      }
    })
  }
}
