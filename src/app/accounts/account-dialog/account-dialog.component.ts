import { Component, Inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Account } from "../../models/account";

@Component({
  selector: "app-account-dialog",
  templateUrl: "./account-dialog.component.html",
  styleUrls: ["../../styles/dialog.scss"]
})
export class AccountDialogComponent {
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
  currencies: string[] = ["UAH", "USD", "EUR"];
  accounts: Account[] = [
    {
      id: "id1",
      name: "Privat",
      balance: 500,
      type: "savings",
      currency: "EUR"
    },
    {
      id: "id2",
      name: "Cash",
      balance: 2000,
      type: "cash",
      currency: "UAH"
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<AccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      account: ["", this.uniqueNameValidator()],
      balance: "",
      type: "",
      currency: ""
    });
  }

  submit(form: any) {
    const acc = Object.assign(form.value);
    acc.balance = Number.parseInt(acc.balance) || 0;
    this.matDialogRef.close(acc);
  }

  uniqueNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const forbidden = this.accounts.reduce((res, acc) => {
        return res ? true : control.value === acc.name;
      }, false);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }
}
