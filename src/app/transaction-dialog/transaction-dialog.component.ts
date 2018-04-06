import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-transaction-dialog",
  templateUrl: "./transaction-dialog.component.html",
  styleUrls: ["./transaction-dialog.component.scss"]
})
export class TransactionDialogComponent implements OnInit {
  constructor(private matDialogRef: MatDialogRef<TransactionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}

  close() {
    this.matDialogRef.close();
  }
}

