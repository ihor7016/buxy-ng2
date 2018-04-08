import { Component, OnInit, Inject } from "@angular/core";
import { Form, FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-transaction-dialog",
  templateUrl: "./transaction-dialog.component.html",
  styleUrls: ["./transaction-dialog.component.scss"]
})
export class TransactionDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({
      type: new FormControl("-"),
      desc: new FormControl(),
      amount: new FormControl(),
      date: new FormControl(new Date()),
      tag: new FormControl(),
      account: new FormControl()
    });
  }

  ngOnInit() {}

  submit(form) {
    this.matDialogRef.close(form.value);
  }
}
