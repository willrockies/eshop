import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@bluebits/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

import { ORDER_STATUS } from '../order.constants';


@Component({
  selector: "admin-orders-list",
  templateUrl: "./orders-list.component.html",
  styleUrls: ["./orders-list.component.scss"]
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  endSubscription$: Subject<any> = new Subject;
  constructor(
    private ordersService: OrdersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this._getOrders();
  }


  ngOnDestroy(): void {

    this.endSubscription$.complete();
  }


  _getOrders() {
    this.ordersService.getOrders()
      .pipe(takeUntil(this.endSubscription$))
      .subscribe((orders) => {
        this.orders = orders;
      });
  }

  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.ordersService.deleteOrder(orderId)
          .subscribe(
            (response) => {
              this._getOrders();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Order is deleted!'
              }),
                (error: any) => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Order is not deleted!'
                  });
                }
            }
          )
      },
    });
  }

  showOrder(orderId: Order) {
    this.router.navigateByUrl(`orders/${orderId}`)
  }
}
