import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { ProductListComponent } from "./pages/product-list/product-list.component";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { UiModule } from "@bluebits/ui";
import { AccordionModule } from "primeng/accordion";
import { NavComponent } from "./shared/nav/nav.component";

const ROUTES: Routes = [
    {
        path: "",
        component: HomePageComponent
    },
    {
        path: "products",
        component: ProductListComponent
    }
];
@NgModule({
    declarations: [AppComponent, HomePageComponent, ProductListComponent, HeaderComponent, FooterComponent, NavComponent],
    imports: [BrowserModule, BrowserAnimationsModule, RouterModule.forRoot(ROUTES), UiModule, AccordionModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
