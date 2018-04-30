import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/observable/combineLatest";

import { TransactionDialogComponent } from "../transaction-dialog/transaction-dialog.component";

import { TransactionsService } from "../../services/storage/transactions.service";
import { AccountsService } from "../../services/storage/accounts.service";
import { TagsService } from "../../services/storage/tags.service";
import { CurrencyUahService } from "../../services/currency-uah.service";

import { Account } from "../../interfaces/account";
import { Tag } from "../../interfaces/tag";

interface Data {
  transactions: TransactionUah[];
  accounts: Account[];
  tags: Tag[];
}

interface TransactionUah {
  id: string;
  desc: string;
  date: string;
  type: string;
  amount: number;
  amountUah: number;
  accountId: string;
  tagId: string;
}

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"],
  providers: [CurrencyUahService]
})
export class TransactionsComponent implements OnInit {
  dataStream: Observable<Data>;
  dataSubscription: Subscription;
  data: Data;

  constructor(
    private dialog: MatDialog,
    private transDB: TransactionsService,
    private accDB: AccountsService,
    private tagDB: TagsService,
    private converter: CurrencyUahService
  ) {}

  ngOnInit() {
    const transactions = this.transDB.getList();
    const accounts = this.accDB.getList();
    const tags = this.tagDB.getList();
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

  editTransaction(data) {
    return this.transDB.updateData(data).subscribe();
  }

  deleteTransaction(event) {
    return this.transDB.deleteData(event.id).subscribe();
  }

  handleEditTransactionClick(event) {
    this.openTransactionDialog("Edit", event.data);
  }

  handleAddTransactionClick() {
    this.openTransactionDialog("Add");
  }

  openTransactionDialog(action, dataToEdit?) {
    const transactionDialog = this.dialog.open(TransactionDialogComponent, {
      data: {
        action: action,
        accounts: this.data.accounts,
        tags: this.data.tags,
        dataToEdit: dataToEdit || null
      },
      minWidth: "50%"
    });
    transactionDialog.afterClosed().subscribe(data => {
      if (data) {
        if (action === "Add") {
          this.addTransaction(data);
        } else if (action === "Edit") {
          this.editTransaction(data);
        }
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
