import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularFireModule } from "angularfire2";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AuthService } from "../services/auth.service";
import { AuthComponent } from "./auth.component";
import { AuthGuard } from "../services/auth-guard.service";
import { firebaseConfig } from "../../firebaseConfig";
import { MaterialComponentsModule } from "../material/material.module";

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    MaterialComponentsModule,
    ReactiveFormsModule
  ],
  exports: [AuthComponent],
  providers: [AuthService, AuthGuard],
  declarations: [AuthComponent]
})
export class AuthModule {}
