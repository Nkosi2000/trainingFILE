// src/app/firebase.service.ts
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor() {
    // Initialize Firebase
    const app = initializeApp(environment.firebaseConfig);
    const analytics = getAnalytics(app);
  }
}
