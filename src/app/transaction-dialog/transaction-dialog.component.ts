import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-transaction-dialog",
  templateUrl: "./transaction-dialog.component.html",
  styleUrls: ["../dialog/dialog.scss"],
  providers: [DatePipe]
})
export class TransactionDialogComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private matDialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
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
    const trans = Object.assign(form.value);
    trans.amount = Number.parseInt(trans.amount) || 0;
    trans.date = this.datePipe.transform(trans.date, "yyyy-MM-dd");
    this.matDialogRef.close(trans);
  }
}
