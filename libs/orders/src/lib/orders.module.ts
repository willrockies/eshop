import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";

import { CartIconComponent } from "./components/cart-icon/cart-icon.component";
import { OrderSummaryComponent } from "./components/order-summary/order-summary.component";
import { CartPageComponent } from "./pages/cart-page/cart-page.component";
import { CheckoutPageComponent } from "./pages/checkout-page/checkout-page.component";
import { CartService } from "./services/cart.service";
import { ThankYouPageComponent } from "./pages/thank-you-page/thank-you-page.component";
import { AuthGuardService } from "@bluebits/users";

const ROUTES: Routes = [
    {
        path: "cart",
        component: CartPageComponent
    },
    {
        path: "checkout",
        canActivate:[AuthGuardService],
        component: CheckoutPageComponent
    },
    {
        path: "success",
        component: ThankYouPageComponent
    }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        InputNumberModule,
        BadgeModule,
        ButtonModule,
        CardModule,
        ToolbarModule,
        DropdownModule,
        InputMaskModule,
        InputTextModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [CartIconComponent, CartPageComponent, OrderSummaryComponent, CheckoutPageComponent, ThankYouPageComponent],
    exports: [CartIconComponent]
})
export class OrdersModule {
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
