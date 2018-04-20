import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { TransactionDialogComponent } from "../transaction-dialog/transaction-dialog.component";

import { TransactionsService } from "../../services/transactions.service";

import { Transaction } from "../../interfaces/transaction";
import { Account } from "../../interfaces/account";
import { Tag } from "../../interfaces/tag";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent implements OnInit {
  accounts: Account[];
  tags: Tag[];
  transactions: Transaction[];

  constructor(
    private dialog: MatDialog,
    private transDB: TransactionsService
  ) {}
  ngOnInit() {
    this.transDB.getList().subscribe(list => (this.transactions = list));
    this.accounts = [
      {
        id: "id1",
        name: "Privat",
        balance: 500,
        type: "savings",
        currency: "€"
      },
      { id: "id2", name: "Cash", balance: 2000, type: "cash", currency: "₴" },
      {
        id: "id3",
        name: "BoaBank",
        balance: 5000,
        type: "credit",
        currency: "$"
      }
    ];
    this.tags = [
      { id: "id1", name: "Transport" },
      { id: "id2", name: "Rent" },
      { id: "id3", name: "Restaurant" }
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
    addTransactionDialog.afterClosed().subscribe(data => {
      if (data) {
        this.transDB.setData(data);
      }
    });
  }
}
