import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LoginComponent } from './pages/login/login.component';

const ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }

]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES), InputTextModule, ButtonModule, FormsModule, ReactiveFormsModule],
  declarations: [LoginComponent]
})
export class UsersModule { }
