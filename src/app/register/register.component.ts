import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PopupService} from '../services/utils/popup.service';
import {Router} from '@angular/router';

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
    private router: Router
  ) {
    this.registerForm = formBuilder.group({
      username: ['', [Validators.required,Validators.minLength(3)]],
      name: ['', [Validators.required,Validators.minLength(3)]],
      age: ['0'],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  showPasswordToggle (): void {
    this.showPassword =! this.showPassword;
  }

  enviar () {
    if (this.registerForm.invalid) {
      return;
    }


    this.popupService.showMessage(
      "success", "Registrarse",
      "Usted se registro con exito")

    this.router.navigate(['login'])
  }
}
