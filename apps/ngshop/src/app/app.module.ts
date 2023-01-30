import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ProductsModule } from '@bluebits/products';
import { UiModule } from '@bluebits/ui';
import { AccordionModule } from 'primeng/accordion';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavComponent } from './shared/nav/nav.component';

const ROUTES: Routes = [
  {
    path: "",
    component: HomePageComponent
  }
];
@NgModule({
  declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, RouterModule.forRoot(ROUTES), UiModule, AccordionModule, ProductsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
