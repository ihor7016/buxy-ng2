import { Injectable } from "@angular/core";

@Injectable()
export class MockAngularFire {
  public auth: Auth = new Auth();
}

class Auth {
  public currentUser;

  signInWithEmailAndPassword(email, password) {
    this.currentUser = {
      email: email
    };
  }

  createUserWithEmailAndPassword(email, password) {
    this.currentUser = {
      email: email
    };
  }

  signInWithPopup() {}

  signOut(): Promise<any> {
    return Promise.resolve({});
  }
}
