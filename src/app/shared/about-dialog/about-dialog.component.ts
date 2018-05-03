import { Component } from "@angular/core";
import { version } from "../../../../package.json";

@Component({
  selector: "app-about-dialog",
  templateUrl: "./about-dialog.component.html",
  styleUrls: ["../../styles/dialog.scss"]
})
export class AboutDialogComponent {
  version: any = version;
}
