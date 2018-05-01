import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Account } from "../../interfaces/account";

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
    const dataToEdit = this.data.dataToEdit;
    let dataToEditName = "";
    if (dataToEdit) {
      dataToEditName = dataToEdit.name;
    }
    let dataToEditBalance;
    if (dataToEdit) {
      dataToEditBalance = dataToEdit.balance;
    }

    let dataToEditType = "";
    if (dataToEdit) {
      dataToEditType = dataToEdit.type;
    }
    let dataToEditCurrency = "";
    if (dataToEdit) {
      dataToEditCurrency = dataToEdit.currency;
    }
    this.form = this.formBuilder.group({
      name: [dataToEditName, this.uniqueNameValidator.bind(this)],
      balance: dataToEditBalance,
      type: dataToEditType,
      currency: dataToEditCurrency
    });
    this.addEventValidation([
      this.form.controls.name,
      this.form.controls.balance
    ]);
  }

  submit(form: any) {
    const val = form.value;
    let id = "";
    let currency = "";
    if (this.data.dataToEdit) {
      id = this.data.dataToEdit.id;
      currency = this.data.dataToEdit.currency;
    } else {
      id = val.id;
      currency = val.currency;
    }

    const acc: Account = {
      id: id,
      name: val.name,
      balance: val.balance,
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
