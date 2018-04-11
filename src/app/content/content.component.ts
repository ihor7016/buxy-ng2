import { Component, Input } from "@angular/core";
import { MatSidenav } from "@angular/material";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"]
})
export class ContentComponent {
  @Input() sideBar: MatSidenav;

  toggleSideBar() {
    this.sideBar.toggle();
  }
}
