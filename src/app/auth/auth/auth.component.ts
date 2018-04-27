import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { AuthDialogComponent } from "../auth-dialog/auth-dialog.component";

@Component({
  selector: "app-signin",
  templateUrl: "./auth.component.html"
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    setTimeout(() => {
      this.dialog.open(AuthDialogComponent);
    }, 0);
  }

  ngOnDestroy() {
    this.dialog.closeAll();
  }
}
