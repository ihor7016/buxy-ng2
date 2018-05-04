import { NgModule } from "@angular/core";

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";

import { SharedModule } from "../shared/shared.module";
import { AuthService } from "./auth/auth.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthDialogComponent } from "./auth-dialog/auth-dialog.component";
import { config } from "../../../firebase.config";
import { AuthGuard } from "./auth/auth-guard.service";
import { MainGuard } from "./auth/main-guard.service";

@NgModule({
  imports: [
    SharedModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  exports: [AuthComponent],
  providers: [AuthService, AuthGuard, MainGuard],
  declarations: [AuthComponent, AuthDialogComponent],
  entryComponents: [AuthDialogComponent]
})
export class AuthModule {}
