import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Auth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireAuth: Auth) {
    this.fireAuth.currentUser
  }
}
