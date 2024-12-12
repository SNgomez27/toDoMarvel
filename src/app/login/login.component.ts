import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PopupService} from '../services/utils/popup.service';
import {LoginService} from '../services/auth/login.service';
import {LoginUser} from '../services/interfaces/usuario';
import Swal from 'sweetalert2';

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
    private loginService: LoginService
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
    this.loginService.loginv2(this.loginForm.value as LoginUser).subscribe({
      next:data => {
        this.popupService.showMessage(
          "success",
          "Iniciar sesion",
          "se ha iniciado sesion correctamente"
        )
      },
      error: err=> {
        if (err.status === 401) {
          this.popupService.showMessage(
            "error",
            "ops la contraseña es incorrecta",
            "intentalo de nuevo"
          )
        } else {
          this.popupService.showMessage(
            "error",
            "ops algo salio mal",
            "intentalo de nuevo"
          )

        }
      }
    })


    if (this.loginForm.invalid){
      return;
} else {
  this.popupService.showMessage("success",
  "Success",
  "Se inicio sesion con exito")

    }
  }





}
