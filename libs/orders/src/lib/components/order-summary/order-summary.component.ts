import { Component, OnInit, OnDestroy } from "@angular/core";
import { CartService, OrdersService } from "@bluebits/orders";
import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators"
@Component({
  selector: "orders-order-summary",
  templateUrl: "./order-summary.component.html",
  styleUrls: ["./order-summary.component.scss"]
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  endSubs$: Subject<any> = new Subject();
  totalPrice: number;

  constructor(private cartService: CartService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
  _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items.map((item) => {
          this.ordersService
            .getProduct(item.productId)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.price * item.quantity;
            });
        });
      }
    });
  }
}
