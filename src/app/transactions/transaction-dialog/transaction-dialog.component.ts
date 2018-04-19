import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Transaction } from "../../interfaces/transaction";

interface TransactionDialogData {
  action: string;
  dataToEdit?: Transaction;
}

@Component({
  selector: "app-transaction-dialog",
  templateUrl: "./transaction-dialog.component.html",
  styleUrls: ["../../styles/dialog.scss"],
  providers: [DatePipe]
})
export class TransactionDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private matDialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.createForm();
    this.form.controls.amount.valueChanges.subscribe(() =>
      this.form.controls.amount.markAsTouched()
    );
  }

  createForm() {
    this.form = this.formBuilder.group({
      type: "-",
      desc: "",
      amount: "",
      date: new Date(),
      tagId: "",
      accountId: ""
    });
  }

  submit(form: any) {
    const trans = Object.assign(form.value);
    trans.amount = Number.parseInt(trans.amount) || 0;
    trans.date = this.datePipe.transform(trans.date, "yyyy-MM-dd");
    this.matDialogRef.close(trans);
  }
}
