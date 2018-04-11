import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        console.log(res);
        this.router.navigate(['main']);
      })
      .catch((err) => console.log(err));
  }

  signInWithEmail() {

    this.authService.signInRegular(this.user.email, this.user.password)
      .then((res) => {
        console.log(res);
        this.router.navigate(['main']);
      })
      .catch((err) => console.log('error: ' + err));
  }

  ngOnInit() {
  }
}
