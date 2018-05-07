import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth-dialog",
  templateUrl: "./auth-dialog.component.html",
  styleUrls: ["../../styles/dialog.scss"]
})
export class AuthDialogComponent implements OnInit {
  userForm: FormGroup;
  error: string;

  constructor(
    private matDialogRef: MatDialogRef<AuthDialogComponent>,
    private router: Router,
    private auth: AuthService
  ) {
    matDialogRef.disableClose = true;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.userForm = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    });
    this.userForm.valueChanges.first().subscribe(() => {
      this.error = "";
      this.userForm.controls.email.markAsTouched();
      this.userForm.controls.password.markAsTouched();
    });
  }

  signInWithGoogle() {
    this.error = "";
    this.auth
      .signInWithGoogle()
      .then(() => this.afterSignIn())
      .catch(error => {
        this.error = error;
      });
  }

  signInWithEmail() {
    this.auth
      .signInRegular(
        this.userForm.value["email"],
        this.userForm.value["password"]
      )
      .then(() => this.afterSignIn())
      .catch(error => {
        this.error = error;
      });
  }

  signUp() {
    this.auth
      .emailSignUp(
        this.userForm.value["email"],
        this.userForm.value["password"]
      )
      .then(() => this.afterSignIn())
      .catch(error => {
        this.error = error;
      });
  }

  login() {
    this.signInWithEmail();
  }

  register() {
    this.signUp();
  }

  private afterSignIn() {
    this.matDialogRef.close();
    this.router.navigate(["main"]);
  }
}
