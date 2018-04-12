import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatSidenav } from "@angular/material";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})

export class ToolbarComponent {
  @Input() sideNav: MatSidenav;

  handleAboutClick() {
    console.log("handleAboutClick");
  }

  handleMenuClick() {
    this.sideNav.toggle();
  }
}
