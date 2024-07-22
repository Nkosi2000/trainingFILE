import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  async signup(formData: any) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(formData.email, formData.password);
      const user = result.user; // Safely access user
      if (user) {
        await this.firestore.collection('users').doc(user.uid).set({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          id: user.uid
        });
        this.router.navigate(['/home']); // Navigate to home or desired page after signup
      } else {
        console.error("User credential is null.");
        alert("An unknown error occurred during signup.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error signing up: ", error.message);
        alert(error.message); // Handle errors as needed
      } else {
        console.error("Unknown error", error);
        alert("An unknown error occurred.");
      }
    }
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/home']); // Navigate to home or desired page after login
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error logging in: ", error.message);
        alert(error.message); // Handle errors as needed
      } else {
        console.error("Unknown error", error);
        alert("An unknown error occurred.");
      }
    }
  }
}
