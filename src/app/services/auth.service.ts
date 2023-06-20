import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CustomUser } from '../models/custom-user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  signInWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  createUserWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

    isAuthenticated(): boolean {
    // Verificar si el usuario está autenticado
    return !!this.afAuth.currentUser;
  }

  async getCurrentUser(): Promise<CustomUser | null> {
    const firebaseUser = await this.afAuth.currentUser;
    if (firebaseUser) {
      // Construir el objeto CustomUser utilizando los campos de firebase.User
      const customUser: CustomUser = {
        firstName: '', // Obtén el valor correcto del campo firstName
        lastName: '', // Obtén el valor correcto del campo lastName
        email: firebaseUser.email || '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
      };
      return customUser;
    } else {
      return null;
    }
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
  
}
