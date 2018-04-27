import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

import { Transaction } from "../../interfaces/transaction";
import { Account } from "../../interfaces/account";
import { Tag } from "../../interfaces/tag";

interface TransactionDialogData {
  action: string;
  accounts: Account[];
  tags: Tag[];
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
    this.form = this.formBuilder.group(this.createData());
  }

  createData() {
    let group;
    if (this.data.dataToEdit) {
      const data = this.data.dataToEdit;
      group = {
        id: data.id,
        type: data.type,
        desc: data.desc,
        amount: data.amount,
        date: new Date(data.date),
        tagId: data.tagId,
        accountId: data.accountId
      };
    } else {
      group = {
        id: "",
        type: "-",
        desc: "",
        amount: "",
        date: new Date(),
        tagId: "",
        accountId: ""
      };
    }
    return group;
  }

  submit(form: any) {
    const val = form.value;
    const trans = {
      id: val.id,
      date: this.datePipe.transform(val.date, "yyyy-MM-dd"),
      type: val.type,
      desc: val.desc,
      amount: Number.parseInt(val.amount),
      tagId: val.tagId,
      accountId: val.accountId
    };
    this.matDialogRef.close(trans);
  }
}
