import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from './../environments/environment';

import {AuthService} from './services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule


  ],
  providers: [AuthService],
  declarations: []
})
export class AuthModule {
}
