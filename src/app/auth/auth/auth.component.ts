import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { AuthDialogComponent } from "../auth-dialog/auth-dialog.component";

@Component({
  selector: "app-signin",
  templateUrl: "./auth.component.html"
})
export class AuthComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    setTimeout(() => {
      this.dialog.open(AuthDialogComponent);
    }, 0);
  }
}
