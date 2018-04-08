import { Component } from "@angular/core";
import { Form, FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material";

import { TransactionDialogComponent } from "./../transaction-dialog/transaction-dialog.component";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent {
  transactionDialog: MatDialogRef<TransactionDialogComponent>;
  constructor(public dialog: MatDialog) {}

  onAddTransactionClick() {
    this.transactionDialog = this.dialog.open(TransactionDialogComponent, {
      data: { action: "Add" },
      minWidth: "50%"
    });
    this.transactionDialog
      .afterClosed()
      .subscribe(res => (res ? console.log(res) : null));
  }
}
