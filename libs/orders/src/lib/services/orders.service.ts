import { StripeService } from 'ngx-stripe';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Order } from '../models/order';
import { OrderItem } from '../models/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiURLOrders = environment.apiUrl + 'orders';
  apiURLProducts = environment.apiUrl + 'products';

  constructor(private http: HttpClient,
    private stripeService: StripeService) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiURLOrders)
  }
  getOrder(orderId: Order): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`)
  }

  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLOrders}/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLOrders}/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }


  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiURLOrders, order)
  }

  // updateOrder(order: Order): Observable<Order> {
  //   return this.http.put<Order>(`${this.apiURLOrders}/${order.id}`, order)
  // }
  updateOrder(orderStatus: { status: string }, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStatus)
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`)
  }

  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURLProducts}/${productId}`);
  }

  createCheckoutSession(orderItem: OrderItem[]) {
    return this.http.post<any>(`${this.apiURLOrders}/create-checkout-session`, orderItem)
      .pipe(
        switchMap((session: { id: string }) => {
        //switchMap((session: any) => {
          return this.stripeService.redirectToCheckout({ sessionId: session.id })
        }));

  }
}

