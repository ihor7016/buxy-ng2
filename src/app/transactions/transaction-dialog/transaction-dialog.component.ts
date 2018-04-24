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
      tag: "",
      account: ""
    });
  }

  submit(form: any) {
    const val = form.value;
    const trans = {
      date: this.datePipe.transform(val.date, "yyyy-MM-dd"),
      type: val.type,
      desc: val.desc,
      amount: Number.parseInt(val.amount),
      amountUah: this.converter.convert(
        val.account.currency,
        Number.parseInt(val.amount)
      ),
      tagId: val.tag.id,
      accountId: val.account.id
    };
    this.matDialogRef.close(trans);
  }
}
