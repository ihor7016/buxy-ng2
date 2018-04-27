import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/observable/combineLatest";

import { TransactionDialogComponent } from "../transaction-dialog/transaction-dialog.component";

import { TransactionsService } from "../../services/storage/transactions.service";
import { DatabaseService } from "../../services/storage/database.service";
import { CurrencyUahService } from "../../services/currency-uah.service";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"],
  providers: [CurrencyUahService]
})
export class TransactionsComponent implements OnInit {
  data: any;
  dataStream: Observable<any>;
  dataSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private transDB: TransactionsService,
    private db: DatabaseService,
    private converter: CurrencyUahService
  ) {}

  ngOnInit() {
    const transactions = this.transDB.getList();
    const accounts = this.db.getList("accounts");
    const tags = this.db.getList("tags");
    this.dataStream = Observable.combineLatest(
      transactions,
      accounts,
      tags,
      (transactions, accounts, tags) => {
        const uahTrans = transactions.map(data =>
          this.convertToUah(data, accounts)
        );
        return { transactions: uahTrans, accounts: accounts, tags: tags };
      }
    );
    this.dataSubscription = this.dataStream.subscribe(
      data => (this.data = data)
    );
  }

  addTransaction(data) {
    return this.transDB.setData(data).subscribe();
  }

  editTransaction() {
    console.log("editTransaction");
  }

  deleteTransaction(event) {
    return this.transDB.deleteData(event.id).subscribe();
  }

  handleAddTransactionClick() {
    const addTransactionDialog = this.dialog.open(TransactionDialogComponent, {
      data: {
        action: "Add",
        accounts: this.data.accounts,
        tags: this.data.tags
      },
      minWidth: "50%"
    });
    addTransactionDialog.afterClosed().subscribe(data => {
      if (data) {
        return this.addTransaction(data);
      }
    });
  }

  convertToUah(transaction, accountList) {
    const newData = Object.assign({}, transaction);
    const currency = accountList.find(elem => elem.id === newData.accountId)
      .currency;
    newData.amountUah = this.converter.convert(currency, newData.amount);
    return newData;
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
