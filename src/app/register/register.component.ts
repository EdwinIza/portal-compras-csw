import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Actualiza esta línea

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
  };
  registrationSuccess: boolean = false;
  registrationError: boolean = false;

  constructor(private authService: AuthService, private firestore: AngularFirestore) {}

  register(): void {
    if (this.validateForm()) {
      this.authService.createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          // Registro exitoso
          this.registrationSuccess = true;
          this.registrationError = false;

          // Guardar los datos del usuario en Firebase
          this.saveUserData();
        })
        .catch((error) => {
          // Error en el registro
          this.registrationSuccess = false;
          this.registrationError = true;
        });
    } else {
      // El formulario no es válido, puedes mostrar un mensaje de error o realizar alguna acción
    }
  }

  validateForm(): boolean {
    // Realiza las validaciones necesarias en el formulario (por ejemplo, coincidencia de contraseñas, validación de correo electrónico, etc.)
    // Devuelve true si el formulario es válido, de lo contrario, devuelve false
    
    // Ejemplo de validación básica: Verificar si las contraseñas coinciden
    if (this.user.password !== this.user.confirmPassword) {
      return false; // Las contraseñas no coinciden, el formulario no es válido
    }
  
    // Ejemplo de validación básica: Verificar si los correos electrónicos coinciden
    if (this.user.email !== this.user.confirmEmail) {
      return false; // Los correos electrónicos no coinciden, el formulario no es válido
    }
  
    // Agrega más validaciones según tus requisitos
    
    return true; // Todas las validaciones pasaron, el formulario es válido
  }

  saveUserData(): void {
    this.firestore.collection('users').add(this.user);
  }
}
