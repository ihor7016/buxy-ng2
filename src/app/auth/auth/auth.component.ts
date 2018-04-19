import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { AuthService } from "../../services/auth.service";
import { AuthDialogComponent } from "../auth-dialog/auth-dialog.component";

@Component({
  selector: "app-signin",
  templateUrl: "./auth.component.html"
})
export class AuthComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.dialog.open(AuthDialogComponent, {
      width: "500px"
    });
  }
}
