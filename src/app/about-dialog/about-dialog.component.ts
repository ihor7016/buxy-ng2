import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-about-dialog",
  templateUrl: "./about-dialog.component.html",
  styleUrls: ["../dialog/dialog.scss"]
})
export class AboutDialogComponent implements OnInit {
  constructor(private matDialogRef: MatDialogRef<AboutDialogComponent>) {}

  ngOnInit() {}

  submit() {
    this.matDialogRef.close();
  }
}
