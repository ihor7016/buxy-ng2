import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user = null;

  constructor(private authService: AuthService) {
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }


  ngOnInit() {
  }
}
