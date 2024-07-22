import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  email: string = '';
  password: string = '';
  firstname: string = '';
  lastname: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  async signUp() {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      const user = userCredential.user;

      if (user) {
        await this.firestore.collection('users').doc(user.uid).set({
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email
        });
        this.router.navigate(['/home']);
      } else {
        console.error("User credential is null.");
        alert("An unknown error occurred during signup.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error signing up: ", error.message);
        alert(error.message);
      } else {
        console.error("Unknown error", error);
        alert("An unknown error occurred.");
      }
    }
  }
}
