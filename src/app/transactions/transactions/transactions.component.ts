import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { TransactionDialogComponent } from "../transaction-dialog/transaction-dialog.component";
import { Observable } from "rxjs/Observable";

import { TransactionsService } from "../../services/transactions.service";
import { DatabaseService } from "../../services/database.service";

import { Transaction } from "../../interfaces/transaction";
import { Account } from "../../interfaces/account";
import { Tag } from "../../interfaces/tag";

import "rxjs/add/operator/mergeMap";
import "rxjs/add/observable/from";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[];
  accounts: Account[];
  tags: Tag[];
  transactionsStream: Observable<any>;

  constructor(
    private dialog: MatDialog,
    private transDB: TransactionsService,
    private db: DatabaseService
  ) {}
  ngOnInit() {
    this.transactionsStream = this.transDB
      .getList()
      .mergeMap(list => {
        let tableData: any = list;
        return Observable.from(list).mergeMap(item => {
          console.dir(item);
          return (tableData.account = this.db.getData(
            "accounts",
            item.accountId
          ));
        });
        // item.tag = this.db.getData("tags", item.tagId).subscribe();
      })
      .map(list => {
        console.log(list);
        return list;
      });
    this.transDB.getList().subscribe(list => (this.transactions = list));
    this.db
      .getList("accounts")
      .subscribe((list: Account[]) => (this.accounts = list));
    this.db.getList("tags").subscribe((list: Tag[]) => (this.tags = list));
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
        this.transDB.setData(data).subscribe();
      }
    });
  }
}

export const ACC = [
  { name: "Privat", balance: 500, type: "savings", currency: "€" },
  { name: "Cash", balance: 2000, type: "cash", currency: "₴" },
  { name: "BoaBank", balance: 5000, type: "credit", currency: "$" }
];

export const TAG = [
  { name: "Transport" },
  { name: "Rent" },
  { name: "Restaurant" }
];
