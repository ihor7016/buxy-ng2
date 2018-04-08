import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-transaction-dialog",
  templateUrl: "./transaction-dialog.component.html",
  styleUrls: ["./transaction-dialog.component.scss"],
  providers: [DatePipe]
})
export class TransactionDialogComponent {
  form: FormGroup;
  accounts: any[];
  tags: string[];

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private matDialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.accounts = [
      { name: "Cash", id: "ibf3y0kuv4" },
      { name: "BoaBank", id: "w2dvndxoz7n" },
      { name: "Private", id: "tfcmw2vqfgk" }
    ];
    this.tags = [
      "Rent",
      "Restaurant",
      "Salary",
      "Groceries",
      "Entertainment",
      "Building"
    ];
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      type: "-",
      desc: "",
      amount: "",
      date: new Date(),
      tag: "",
      accountId: ""
    });
  }

  submit(form) {
    const data = JSON.parse(JSON.stringify(form.value));
    data.amount = Number.parseInt(data.amount);
    data.date = this.datePipe.transform(data.date, "yyyy-MM-dd");
    this.matDialogRef.close(data);
  }
}
