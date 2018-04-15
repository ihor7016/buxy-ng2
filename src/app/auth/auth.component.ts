import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-signin",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  userForm: FormGroup;
  formErrors = {
    email: "",
    password: ""
  };
  validationMessages = {
    email: {
      required: "Please enter your email",
      email: "Please enter your vaild email"
    },
    password: {
      required: "please enter your password",
      pattern: "Password must contain numbers and letters",
      minlength: "Please enter more than 4 characters",
      maxlength: "Please enter less than 25 characters"
    }
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.pattern("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"),
          Validators.minLength(6),
          Validators.maxLength(25)
        ]
      ]
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + " ";
            }
          }
        }
      }
    }
  }

  signInWithGoogle() {
    this.auth.signInWithGoogle().then(() => this.afterSignIn());
  }

  signInWithEmail() {
    this.auth
      .signInRegular(
        this.userForm.value["email"],
        this.userForm.value["password"]
      )
      .then(() => this.afterSignIn())
      .catch(error => console.log("Mailbox login error：", error));
  }

  login() {
    this.signInWithEmail();
  }

  private afterSignIn() {
    this.router.navigate(["main"]);
  }
}
