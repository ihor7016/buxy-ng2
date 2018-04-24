import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Transaction } from "../../interfaces/transaction";

import { CurrencyUahService } from "../../services/currency-uah.service";

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
    private converter: CurrencyUahService,
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
    const trans = Object.assign({}, form.value);
    trans.accountId = trans.account.id;
    trans.amount = Number.parseInt(trans.amount) || 0;
    trans.amountUah = this.converter.convert(
      trans.account.currency,
      trans.amount
    );
    trans.date = this.datePipe.transform(trans.date, "yyyy-MM-dd");
    this.matDialogRef.close(trans);
  }
}
