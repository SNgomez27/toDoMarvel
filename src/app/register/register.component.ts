import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PopupService} from '../services/utils/popup.service';
import {Router} from '@angular/router';
import {RegisterService} from '../services/auth/register.service';
import {NewUser} from '../services/interfaces/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private popupService: PopupService,
    private router: Router,
    private registerService: RegisterService,

  ) {
    this.registerForm = formBuilder.group({
      username: ['', [Validators.required,Validators.minLength(2)]],
      nombre : ['', [Validators.required,Validators.minLength(2)]],
      edad: ['0'],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  showPasswordToggle (): void {
    this.showPassword =! this.showPassword;
  }

  enviar () {
    if (this.registerForm.invalid)
      return;
    const  nuevoUsuario: NewUser ={
      nombre : this.registerForm.value.name,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email,
      edad : this.registerForm.value.edad}


      this.registerService.createUser(
        this.registerForm.value as NewUser).subscribe({
        next: ()=> {
          this.popupService.showMessage(
            "success",
            "Registro exitoso!",
            "te has registrado correctamente:")
        },
        error: error=> {
          console.log(error);
        }
      })

    this.popupService.showMessage(
      "success", "Registrarse",
      "Usted se registro con exito")

    this.router.navigate(['login'])
  }
}

