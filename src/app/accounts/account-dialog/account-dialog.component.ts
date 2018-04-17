import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

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

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<AccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      account: ["", this.uniqueNameValidator.bind(this)],
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

  uniqueNameValidator(control: FormControl) {
    let existing = true;
    let val = control.value;
    if (this.data.current) {
      existing = !(this.data.current.name.toLowerCase() === val.toLowerCase());
    }
    if (existing) {
      existing = this.data.accounts.reduce((res, acc) => {
        return res ? true : acc.name.toLowerCase() === val.toLowerCase();
      }, false);
    }
    return existing ? { existingName: { value: val } } : null;
  }
}
