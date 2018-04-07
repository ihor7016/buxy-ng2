import { Component, OnInit } from "@angular/core";
import { Form, FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material";

import { TransactionDialogComponent } from "./../transaction-dialog/transaction-dialog.component";
import { Transaction } from "./transaction";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent implements OnInit {
  transactionDialog: MatDialogRef<TransactionDialogComponent>;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  onAddTransactionClick() {
    this.transactionDialog = this.dialog.open(TransactionDialogComponent, {
      data: { action: "Add" },
      minWidth: "50%"
    });
    this.transactionDialog.afterClosed().subscribe(res => console.log(res));
  }
}
