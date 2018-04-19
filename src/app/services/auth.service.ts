import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

@Injectable()
export class AuthService {
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {}

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  get currentUser() {
    return this._firebaseAuth.auth.currentUser;
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    return this._firebaseAuth.auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() =>
        this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      );
  }

  emailSignUp(email: string, password: string) {
    return this._firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error));
  }

  isLoggedIn() {
    return this._firebaseAuth.auth;
  }

  logout() {
    this._firebaseAuth.auth.signOut().then(res => this.router.navigate(["/"]));
  }
}
