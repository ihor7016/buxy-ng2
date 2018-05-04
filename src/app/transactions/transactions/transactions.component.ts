import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/observable/combineLatest";

import { TransactionDialogComponent } from "../transaction-dialog/transaction-dialog.component";

import { TransactionsService } from "../../storage/services/transactions.service";
import { AccountsService } from "../../storage/services/accounts.service";
import { TagsService } from "../../storage/services/tags.service";
import { CurrencyUahService } from "../../shared/services/currency-uah.service";
import { ErrorService } from "../../shared/error/error.service";

import { TransactionsData } from "./transactions-data.interface";
import { Transaction } from "../../interfaces/transaction.interface";
import { Account } from "../../interfaces/account.interface";
import { Tag } from "../../interfaces/tag.interface";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent implements OnInit, OnDestroy {
  dataStream: Observable<TransactionsData>;
  dataSubscription: Subscription;
  data: TransactionsData;

  constructor(
    private dialog: MatDialog,
    private transactionsService: TransactionsService,
    private accountsService: AccountsService,
    private tagsService: TagsService,
    private converter: CurrencyUahService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    const transactions: Observable<
      Transaction[]
    > = this.transactionsService.getList();
    const accounts: Observable<Account[]> = this.accountsService.getList();
    const tags: Observable<Tag[]> = this.tagsService.getList();
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
    return this.transactionsService.setData(data);
  }

  editTransaction(data) {
    return this.transactionsService.updateData(data);
  }

  deleteTransaction(id) {
    return this.transactionsService.deleteData(id);
  }

  handleDeleteTransaction(event) {
    this.deleteTransaction(event.id).subscribe();
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
    transactionDialog
      .afterClosed()
      .filter(res => res)
      .subscribe(res => {
        if (action === "Add") {
          this.addTransaction(res).subscribe(
            () => {},
            error => this.errorService.setError(error)
          );
        } else if (action === "Edit") {
          this.editTransaction(res).subscribe(
            () => {},
            error => this.errorService.setError(error)
          );
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
