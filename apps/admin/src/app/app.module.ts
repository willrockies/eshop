import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {TableModule} from 'primeng/table';

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
  imports: [BrowserModule, ...UX_MODULE, RouterModule.forRoot(ROUTES, { initialNavigation: "enabledBlocking" })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
