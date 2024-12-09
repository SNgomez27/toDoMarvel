import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PopupService} from '../services/utils/popup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  cambiarVistaContra: boolean = false;

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private popupService: PopupService,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  toggleContra(): void {
    this.cambiarVistaContra = !this.cambiarVistaContra;
  }
enviar(): void {
    if (this.loginForm.invalid){
      return;
} else {
  this.popupService.showMessage("success",
  "Success",
  "Se inicio sesion con exito")

    }
  }
}
