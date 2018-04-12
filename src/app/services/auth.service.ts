import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    return _firebase
      .auth
      .setPersistence(
        firebase
          .auth.Auth.Persistence.SESSION).then(() =>
    return this._firebaseAuth.signInWithEmailAndPassword(email, password);
  )
    ;
  }

  isLoggedIn() {
    return this._firebaseAuth.auth;
  }


  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }
}
