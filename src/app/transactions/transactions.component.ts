import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";

import { TransactionDialogComponent } from "./../transaction-dialog/transaction-dialog.component";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  onAddTransactionClick() {
    this.dialog.open(TransactionDialogComponent, {
      data: { action: "Add" },
      minWidth: "50%"
    });
  }
}
