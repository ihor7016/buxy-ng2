import { Component, AfterContentInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { TransactionDialogComponent } from "../transaction-dialog/transaction-dialog.component";
import { Observable } from "rxjs/Observable";

import { TransactionsService } from "../../services/transactions.service";
import { DatabaseService } from "../../services/database.service";

import { Transaction } from "../../interfaces/transaction";
import { Account } from "../../interfaces/account";
import { Tag } from "../../interfaces/tag";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent implements AfterContentInit {
  accounts: Account[];
  tags: Tag[];
  contentData: Observable<any>;

  constructor(
    private dialog: MatDialog,
    private transDB: TransactionsService,
    private db: DatabaseService
  ) {}
  ngAfterContentInit() {
    this.contentData = this.transDB
      .getList()
      .map(list => this.convertList(list));
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

  convertList(list) {
    return list.map(data => {
      let newData = Object.assign(data);
      this.db
        .getData("accounts", data.accountId)
        .subscribe(acc => (newData.account = acc));
      this.db.getData("tags", data.tagId).subscribe(tag => (newData.tag = tag));
      return newData;
    });
  }

  handleAddTransactionClick() {
    const addTransactionDialog = this.dialog.open(TransactionDialogComponent, {
      data: {
        action: "Add",
        accounts: this.accounts,
        tags: this.tags
      },
      minWidth: "50%"
    });
    addTransactionDialog.afterClosed().subscribe(data => {
      if (data) {
        this.transDB.setData(data).subscribe();
      }
    });
  }
}
