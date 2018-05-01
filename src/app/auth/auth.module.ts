import { NgModule } from "@angular/core";

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";

import { SharedModule } from "../shared/shared.module";
import { AuthService } from "../services/auth.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthDialogComponent } from "./auth-dialog/auth-dialog.component";
import { config } from "../../../firebase.config";

@NgModule({
  imports: [
    SharedModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  exports: [AuthComponent],
  providers: [AuthService],
  declarations: [AuthComponent, AuthDialogComponent],
  entryComponents: [AuthDialogComponent]
})
export class AuthModule {}
