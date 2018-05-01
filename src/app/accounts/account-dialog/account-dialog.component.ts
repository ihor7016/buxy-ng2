import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Account } from "../../interfaces/account.interface";

interface AccountDialogData {
  action: string;
  accounts: Account[];
  dataToEdit?: Account;
}

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
    this.form = this.formBuilder.group({
      name: ["", this.uniqueNameValidator.bind(this)],
      balance: "",
      type: "",
      currency: ""
    });
    this.addEventValidation([
      this.form.controls.name,
      this.form.controls.balance
    ]);
  }

  submit(form: any) {
    const acc = Object.assign(form.value);
    acc.balance = Number.parseInt(acc.balance) || 0;
    this.matDialogRef.close(acc);
  }

  addEventValidation(fields: AbstractControl[]) {
    fields.forEach(field =>
      field.valueChanges.subscribe(() => field.markAsTouched())
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
