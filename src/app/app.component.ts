import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";

import { AboutDialogComponent } from "./about-dialog/about-dialog.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private dialog: MatDialog) {}

  onAboutClick() {
    this.dialog.open(AboutDialogComponent, { minWidth: "50%" });
  }
}
