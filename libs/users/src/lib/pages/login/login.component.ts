import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "users-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this._initLoginForm();
  }

  onSubmit(){
    this.isSubmitted = true;
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get loginForm(){
    return this.loginFormGroup.controls;
  }
}
