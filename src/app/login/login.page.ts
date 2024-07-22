import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  login() {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => this.router.navigate(['/home']))
      .catch(error => console.error("Error logging in: ", error));
  }
}
