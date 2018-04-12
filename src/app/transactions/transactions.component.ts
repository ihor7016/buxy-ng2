import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";

import { TransactionDialogComponent } from "./transaction-dialog/transaction-dialog.component";

import { StorageService } from "../services/storage.service";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent {
  accounts: any[];
  tags: string[];
  data: any;
  constructor(private dialog: MatDialog, private storage: StorageService) {
    /// *******************

    const acc = { name: "Cash", balance: 200, type: "cash", currency: "UAH" };
    this.data = this.storage
      .getObject("transactions", "transId1")
      .valueChanges();

    this.storage.setObject("accounts", acc);

    /// ******************
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
    const addTransactionDialog = this.dialog.open(TransactionDialogComponent, {
      data: { action: "Add", accounts: this.accounts, tags: this.tags },
      minWidth: "50%"
    });
    addTransactionDialog
      .afterClosed()
      .subscribe(res => (res ? console.log(res) : null));
  }
}
