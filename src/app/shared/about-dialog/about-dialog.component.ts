import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { version } from "../../../../package.json";

@Component({
  selector: "app-about-dialog",
  templateUrl: "./about-dialog.component.html",
  styleUrls: ["./about-dialog.component.scss"]
})
export class AboutDialogComponent {
  version: any = version;
  constructor(public matDialogRef: MatDialogRef<AboutDialogComponent>) {}
}
