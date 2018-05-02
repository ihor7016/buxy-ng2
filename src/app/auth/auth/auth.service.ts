import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";

@Injectable()
export class AuthService {
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    _firebaseAuth.auth.onAuthStateChanged(user => {
      if (user) {
        router.navigate(["main"]);
      } else {
        router.navigate(["/"]);
      }
    });
  }

  get currentUser() {
    return this._firebaseAuth.auth.currentUser;
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  emailSignUp(email: string, password: string) {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );
  }

  logout() {
    this._firebaseAuth.auth.signOut().then(res => this.router.navigate(["/"]));
  }
}
