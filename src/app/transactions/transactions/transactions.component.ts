import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { TransactionDialogComponent } from "../transaction-dialog/transaction-dialog.component";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/observable/combineLatest";

import { TransactionsService } from "../../services/transactions.service";
import { DatabaseService } from "../../services/database.service";
import { Transaction } from "../../interfaces/transaction";
import { Tag } from "../../interfaces/tag";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent implements OnInit {
  contentData: Observable<any>;
  transactions: Observable<Transaction[]>;
  tags: Observable<Tag[]>;
  dialogSelects: Subscription;
  pieData: any;

  constructor(
    private dialog: MatDialog,
    private transDB: TransactionsService,
    private db: DatabaseService
  ) {
    this.transactions = this.transDB.getList();
    this.tags = this.db.getList<Tag>("tags");
    // Observable.combineLatest(this.transactions, this.tags, (transactions, tags) => {
    //   return {transactions: transactions, tags: tags};
    // }).subscribe((pieData) => this.pieData = pieData);
  }

  ngOnInit() {
    this.contentData = this.transactions
      .map(list => list.reverse())
      .map(list => list.map(data => this.extractData(data)));
  }

  addTransaction(data) {
    return this.transDB.setData(data).subscribe();
  }

  editTransaction() {
    console.log("editTransaction");
  }

  deleteTransaction() {
    console.log("deleteTransaction");
  }

  handleAddTransactionClick() {
    this.dialogSelects = this.getDialogSelects().subscribe(data =>
      this.openAddTransactionDialog(data)
    );
  }

  openAddTransactionDialog(data) {
    const addTransactionDialog = this.dialog.open(TransactionDialogComponent, {
      data: {
        action: "Add",
        accounts: data.accounts,
        tags: data.tags
      },
      minWidth: "50%"
    });
    this.dialogSelects.unsubscribe();
    addTransactionDialog.afterClosed().subscribe(data => {
      if (data) {
        return this.addTransaction(data);
      }
    });
  }

  extractData(data) {
    let newData = Object.assign({}, data);
    this.db
      .getData("accounts", data.accountId)
      .subscribe(acc => (newData.account = acc));
    this.db.getData("tags", data.tagId).subscribe(tag => (newData.tag = tag));
    return newData;
  }

  getDialogSelects() {
    return Observable.combineLatest(
      this.db.getList("accounts"),
      this.db.getList("tags"),
      (accounts, tags) => {
        return {
          accounts: accounts,
          tags: tags
        };
      }
    );
  }
}
