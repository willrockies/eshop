import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

const ROUTES: Routes = [
  {
    path:'',
    component: ShellComponent,
    children: [
      {
        path:'dashboard',
        component: DashboardComponent
      }
    ]
  }
]

@NgModule({
    declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent],
    imports: [BrowserModule, RouterModule.forRoot(ROUTES, { initialNavigation: "enabledBlocking" })],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
