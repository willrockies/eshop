import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { OrdersModule } from '@bluebits/orders';
import { ProductsModule } from '@bluebits/products';
import { UiModule } from '@bluebits/ui';
import { JwtInterceptor, UsersModule } from '@bluebits/users';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxStripeModule } from 'ngx-stripe';
import { AccordionModule } from 'primeng/accordion';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { MessagesComponent } from './shared/messages/messages.component';
import { NavComponent } from './shared/nav/nav.component';

const ROUTES: Routes = [
  {
    path: "",
    component: HomePageComponent
  }
];
@NgModule({
  declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent, MessagesComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NgxStripeModule.forRoot('pk_test_51MZl2fDjDn78nwlPZz4mt2uBys63DDGxJaQgzKbKBSjQE6vgW7nQ8ZWmISx7IszuhFGM3BFmm0csOKVrM15NuGTx00dsWhn0ty'),
    UiModule,
    AccordionModule,
    ToastModule,
    ProductsModule,
    OrdersModule,
    UsersModule,
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
