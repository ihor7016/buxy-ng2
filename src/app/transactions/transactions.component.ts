import { Component } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";

import { TransactionDialogComponent } from "./../transaction-dialog/transaction-dialog.component";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent {
  transactionDialog: MatDialogRef<TransactionDialogComponent>;
  accounts: any[];
  tags: string[];
  constructor(private dialog: MatDialog) {
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
  }

  handleAddTransactionClick() {
    this.transactionDialog = this.dialog.open(TransactionDialogComponent, {
      data: { action: "Add", accounts: this.accounts, tags: this.tags },
      minWidth: "50%"
    });
    this.transactionDialog
      .afterClosed()
      .subscribe(res => (res ? console.log(res) : null));
  }
}
