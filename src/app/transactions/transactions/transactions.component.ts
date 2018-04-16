import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { TransactionDialogComponent } from "../transaction-dialog/transaction-dialog.component";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent {
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

  editTransaction() {
    console.log("editTransaction");
  }

  deleteTransaction() {
    console.log("deleteTransaction");
  }

  handleAddTransactionClick() {
    const addTransactionDialog = this.dialog.open(TransactionDialogComponent, {
      data: { action: "Add", accounts: this.accounts, tags: this.tags },
      minWidth: "50%"
    });
    addTransactionDialog
      .afterClosed()
      .subscribe(res => (res ? console.log(res) : null));
  }
}
