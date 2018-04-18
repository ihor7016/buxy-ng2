import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
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
    this.addEventValidation([
      this.form.controls.account,
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
    const existing = !this.isCurrent(control.value)
      ? this.exists(control.value)
      : false;
    return existing ? { existingName: { value: control.value } } : null;
  }

  isCurrent(name) {
    return this.data.current
      ? name.toLowerCase() === this.data.current.name.toLowerCase()
      : false;
  }

  exists(name) {
    return this.data.accounts.reduce((res, acc) => {
      return res || acc.name.toLowerCase() === name.toLowerCase();
    }, false);
  }
}
