import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signIn(): void {
    this.authService.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        // Autenticación exitosa, realizar acciones adicionales si es necesario
        this.router.navigateByUrl('/'); // Redirigir a la página de inicio
      })
      .catch(error => {
        // Manejar el error de autenticación, mostrar un mensaje de error, etc.
      });
  }

  signUp(): void {
    this.authService.createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        // Registro exitoso, realizar acciones adicionales si es necesario
        this.router.navigateByUrl('/'); // Redirigir a la página de inicio
      })
      .catch(error => {
        // Manejar el error de registro, mostrar un mensaje de error, etc.
      });
  }
}
