import { Component, AfterContentInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { TransactionDialogComponent } from "../transaction-dialog/transaction-dialog.component";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/observable/combineLatest";

import { TransactionsService } from "../../services/transactions.service";
import { DatabaseService } from "../../services/database.service";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent implements AfterContentInit {
  contentData: Observable<any>;
  dialogSelects: Subscription;

  constructor(
    private dialog: MatDialog,
    private transDB: TransactionsService,
    private db: DatabaseService
  ) {}
  ngAfterContentInit() {
    this.contentData = this.transDB
      .getList()
      .map(list => list.reverse())
      .map(list => list.map(data => this.convertData(data)));
  }

  editTransaction() {
    console.log("editTransaction");
  }

  deleteTransaction() {
    console.log("deleteTransaction");
  }

  convertData(data) {
    let newData = Object.assign(data);
    this.db
      .getData("accounts", data.accountId)
      .subscribe(acc => (newData.account = acc));
    this.db.getData("tags", data.tagId).subscribe(tag => (newData.tag = tag));
    return newData;
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
        return this.transDB.setData(data).subscribe();
      }
    });
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
