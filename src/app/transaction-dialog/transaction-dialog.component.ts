import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-transaction-dialog",
  templateUrl: "./transaction-dialog.component.html",
  styleUrls: ["./transaction-dialog.component.scss"],
  providers: [DatePipe]
})
export class TransactionDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private matDialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.formBuilder.group({
      type: "-",
      desc: "",
      amount: "",
      date: new Date(),
      tag: "",
      account: ""
    });
  }

  ngOnInit() {}

  submit(form) {
    const data = JSON.parse(JSON.stringify(form.value));
    data.amount = Number.parseInt(data.amount);
    data.date = this.datePipe.transform(data.date, "yyyy-MM-dd");
    this.matDialogRef.close(data);
  }
}
