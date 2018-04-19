import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-auth-dialog",
  templateUrl: "./auth-dialog.component.html",
  styleUrls: ["./auth-dialog.component.scss", "../../styles/dialog.scss"]
})
export class AuthDialogComponent {
  userForm: FormGroup;
  email: FormControl;
  password: FormControl;
  error: string;

  constructor(private matDialogRef: MatDialogRef<AuthDialogComponent>) {
    matDialogRef.disableClose = true;
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl("", [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.password = new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]);
  }

  createForm() {
    this.userForm = new FormGroup({
      email: this.email,
      password: this.password
    });
    this.userForm.valueChanges.subscribe(str => {
      this.error = "";
    });
  }

  // signInWithGoogle() {
  //   this.error = "";
  //   this.auth
  //     .signInWithGoogle()
  //     .then(() => this.afterSignIn())
  //     .catch(error => {
  //       console.log(error);
  //       this.error = error;
  //     });
  // }

  // signInWithEmail() {
  //   this.auth
  //     .signInRegular(
  //       this.userForm.value["email"],
  //       this.userForm.value["password"]
  //     )
  //     .then(() => this.afterSignIn())
  //     .catch(error => {
  //       this.error = error;
  //     });
  // }

  // signUp() {
  //   this.auth
  //     .emailSignUp(
  //       this.userForm.value["email"],
  //       this.userForm.value["password"]
  //     )
  //     .then(() => this.afterSignIn())
  //     .catch(error => {
  //       this.error = error;
  //     });
  // }

  // login() {
  //   this.signInWithEmail();
  // }

  // register() {
  //   this.signUp();
  // }

  // private afterSignIn() {
  //   this.router.navigate(["main"]);
  // }
}
