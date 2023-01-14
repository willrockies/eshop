import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesService } from "@bluebits/products";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { ColorPickerModule } from "primeng/colorpicker";
import { InputNumberModule } from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';


import { AppComponent } from "./app.component";
import { CategoriesFormComponent } from "./pages/categories/categories-form/categories-form.component";
import { CategoriesListComponent } from "./pages/categories/categories-list/categories-list.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ShellComponent } from "./shared/shell/shell.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { ProductsListComponent } from "./pages/products/products-list/products-list.component";
import { ProductsFormComponent } from "./pages/products/products-form/products-form.component";

const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  RippleModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule

];
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
      },
      {
        path: "categories/form",
        component: CategoriesFormComponent
      },
      {
        path: "categories/form/:id",
        component: CategoriesFormComponent
      },
      {
        path: "products",
        component: ProductsListComponent
      },
      {
        path: "products/form",
        component: ProductsFormComponent
      },
      {
        path: "products/form/:id",
        component: ProductsFormComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    ProductsListComponent,
    ProductsFormComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ...UX_MODULE,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, { initialNavigation: "enabledBlocking" })
  ],
  providers: [CategoriesService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
