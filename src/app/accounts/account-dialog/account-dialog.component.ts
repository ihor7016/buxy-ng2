import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import "rxjs/add/operator/first";

import { AccountDialogData } from "./account-dialog-data.interface";
import { Account } from "../../interfaces/account.interface";

@Component({
  selector: "app-account-dialog",
  templateUrl: "./account-dialog.component.html",
  styleUrls: ["../../styles/dialog.scss"]
})
export class AccountDialogComponent implements OnInit {
  form: FormGroup;
  types: string[] = [
    "checking",
    "savings",
    "credit card",
    "cash",
    "investiment",
    "loan",
    "cd",
    "real estate",
    "vehicle",
    "insurance",
    "other"
  ];
  currencies: {}[] = [
    {
      code: "UAH",
      symbol: "₴"
    },
    {
      code: "USD",
      symbol: "$"
    },
    {
      code: "EUR",
      symbol: "€"
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<AccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AccountDialogData
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    const dataToEdit = this.data.dataToEdit;
    let dataToEditName = "";
    let dataToEditBalance;
    let dataToEditType = "";
    let dataToEditCurrency = "";
    if (dataToEdit) {
      dataToEditName = dataToEdit.name;
      dataToEditBalance = dataToEdit.balance;
      dataToEditType = dataToEdit.type;
      dataToEditCurrency = dataToEdit.currency;
    }
    this.createFormBuilder(
      dataToEditName,
      dataToEditBalance,
      dataToEditType,
      dataToEditCurrency
    );
    this.addEventValidation([
      this.form.controls.name,
      this.form.controls.balance
    ]);
  }

  private createFormBuilder(
    dataToEditName: string,
    dataToEditBalance: number,
    dataToEditType: string,
    dataToEditCurrency: string
  ) {
    this.form = this.formBuilder.group({
      name: [dataToEditName, this.uniqueNameValidator.bind(this)],
      balance: dataToEditBalance,
      type: dataToEditType,
      currency: dataToEditCurrency
    });
  }

  submit(form: any) {
    const val = form.value;
    let id = "";
    let currency = "";
    if (this.data.dataToEdit) {
      id = this.data.dataToEdit.id;
      currency = this.data.dataToEdit.currency;
    } else {
      currency = val.currency;
    }

    const acc: Account = {
      id: id,
      name: val.name,
      balance: +val.balance,
      type: val.type,
      currency: currency
    };
    this.matDialogRef.close(acc);
  }

  isEditMode(): Boolean {
    return this.data.dataToEdit !== undefined;
  }

  addEventValidation(fields: AbstractControl[]) {
    fields.forEach(field =>
      field.valueChanges.first().subscribe(() => field.markAsTouched())
    );
  }

  uniqueNameValidator(control: AbstractControl) {
    if (
      !this.isDataToEdit(control.value) &&
      this.isExistingName(control.value)
    ) {
      return { existingName: { value: control.value } };
    }
  }

  isDataToEdit(value: string) {
    return (
      this.data.dataToEdit &&
      value.toLowerCase() === this.data.dataToEdit.name.toLowerCase()
    );
  }

  isExistingName(value: string) {
    const index = this.data.accounts.findIndex(
      account => account.name.toLowerCase() === value.toLowerCase()
    );
    return index >= 0;
  }
}
