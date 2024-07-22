import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
    private router: Router,
    private toastController: ToastController
  ) {}

  async signUp() {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      const user = userCredential.user;

      if (user) {
        const userId = user.uid;

        await this.firestore.collection('users').doc(userId).set({
          email: this.email,
          firstname: this.firstname,
          lastname: this.lastname,
        });

        // Show success toast
        const toast = await this.toastController.create({
          message: 'User signed up successfully',
          duration: 2000,
          color: 'success'
        });
        await toast.present();

        // Clear input fields
        this.email = '';
        this.password = '';
        this.firstname = '';
        this.lastname = '';

        this.router.navigate(['/home']);
      } else {
        console.error('User credential is null');
      }
    } catch (error) {
      console.error('Error signing up:', error);

      // Type assertion to ensure error is of type Error
      const errorMessage = (error as Error).message;

      // Show error toast
      const toast = await this.toastController.create({
        message: `Error signing up: ${errorMessage}`,
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }
}
