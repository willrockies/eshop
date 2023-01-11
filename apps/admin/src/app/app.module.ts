import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesService } from '@bluebits/products';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

import { AppComponent } from './app.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  RippleModule,
  TableModule
]
const ROUTES: Routes = [
  {
    path: "",
    component: ShellComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "categories",
        component: CategoriesListComponent
      }
    ]
  }
];

@NgModule({
  declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoriesListComponent],
  imports: [BrowserModule, ...UX_MODULE, HttpClientModule, RouterModule.forRoot(ROUTES, { initialNavigation: "enabledBlocking" })],
  providers: [CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
