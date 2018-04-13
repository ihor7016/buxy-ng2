import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatSidenav, MatDialog } from "@angular/material";

import { AboutDialogComponent } from "../about-dialog/about-dialog.component";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})

export class ToolbarComponent {
  @Input() sideNav: MatSidenav;

  constructor(private dialog: MatDialog) {}

  handleAboutClick() {
    this.dialog.open(AboutDialogComponent, { minWidth: "50%" });
  }

  handleMenuClick() {
    this.sideNav.toggle();
  }
}
