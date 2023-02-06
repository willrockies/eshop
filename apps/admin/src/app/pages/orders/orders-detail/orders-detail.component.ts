import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { Order, OrdersService, ORDER_STATUS } from "@bluebits/orders";

@Component({
  selector: "admin-orders-detail",
  templateUrl: "./orders-detail.component.html",
  styleUrls: ["./orders-detail.component.scss"]
})
export class OrdersDetailComponent implements OnInit {
  order: Order;
  orderStatus = [];
  selectedStatus: any;
  constructor(
    private orderService: OrdersService,
    private messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }



  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.orderService.getOrder(params["id"]).subscribe((order) => {
          this.order = order;
          this.selectedStatus = this.order.status;
        })

      }
    })
  }

  private _mapOrderStatus() {
    this.orderStatus = Object.keys(ORDER_STATUS).map(key => {
      return {
        id: key,
        name: ORDER_STATUS[key].label,
      }

    });

  }

  onStatusChange(event) {
    this.orderService.updateOrder({ status: event.value }, this.order.id).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order is updated'
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Order is not updated!'
        });
      }
    )

  }
}
