import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularFireModule } from "angularfire2";

import { ReactiveFormsModule } from "@angular/forms";
import { MaterialComponentsModule } from "../material/material.module";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";

import { AuthService } from "../services/auth.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthDialogComponent } from "./auth-dialog/auth-dialog.component";
import { AuthGuard } from "../services/auth-guard.service";
import { config } from "../../../firebase.config";

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MaterialComponentsModule,
    ReactiveFormsModule
  ],
  exports: [AuthComponent],
  providers: [AuthService, AuthGuard],
  declarations: [AuthComponent, AuthDialogComponent],
  entryComponents: [AuthDialogComponent]
})
export class AuthModule {}
