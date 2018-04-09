import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { version } from "../../../package.json";

@Component({
  selector: "app-about-dialog",
  templateUrl: "./about-dialog.component.html",
  styleUrls: ["../dialog/dialog.scss"]
})
export class AboutDialogComponent {
  version: any = version;
  constructor(private matDialogRef: MatDialogRef<AboutDialogComponent>) {}
}
