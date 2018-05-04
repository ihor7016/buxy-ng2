import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/first";

import { AccountDialogComponent } from "../account-dialog/account-dialog.component";

import { AccountsService } from "../../storage/services/accounts.service";
import { TransactionsService } from "../../storage/services/transactions.service";

import { AccountsData } from "./accounts-data.interface";
import { Transaction } from "../../interfaces/transaction.interface";
import { Account } from "../../interfaces/account.interface";

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["../../styles/drawer-menu.scss"]
})
export class AccountsComponent implements OnInit, OnDestroy {
  accounts: AccountsData[];

  private subscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private accountsService: AccountsService,
    private transactionsService: TransactionsService
  ) {
    this.accounts = [];
  }

  ngOnInit() {
    const accounts: Observable<Account[]> = this.accountsService
      .getList()
      .map(res => res.reverse());
    const transactions: Observable<
      Transaction[]
    > = this.transactionsService.getList();
    this.subscription = Observable.combineLatest(
      accounts,
      transactions,
      (accounts, transactions) => {
        return {
          accounts: accounts,
          transactions: transactions
        };
      }
    ).subscribe(
      res => (this.accounts = this.createData(res.accounts, res.transactions))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleAddAccountClick() {
    const addAccountDialog = this.dialog.open(AccountDialogComponent, {
      data: {
        action: "Add",
        accounts: this.accounts
      },
      minWidth: "50%"
    });
    addAccountDialog
      .afterClosed()
      .filter(res => res)
      .subscribe(res => this.accountsService.setData(res).subscribe());
  }

  private removeAccount(account, subscription) {
    this.accountsService.deleteData(account.id).subscribe();
    subscription.unsubscribe();
  }

  private removeTransactions(transactions, account, subscription) {
    transactions.forEach((value, index, array) => {
      this.transactionsService.deleteData(value.id).subscribe(() => {
        if (this.isLastItem(index, array)) {
          this.removeAccount(account, subscription);
        }
      });
    });
  }

  private isLastItem(index, array) {
    return index === array.length - 1;
  }

  deleteAccount(account) {
    const subscription = this.transactionsService
      .getList()
      .first()
      .subscribe(transactions => {
        const transactionsWIthAccount = transactions.filter(
          value => value.accountId === account.id
        );
        if (transactionsWIthAccount.length > 0) {
          this.removeTransactions(
            transactionsWIthAccount,
            account,
            subscription
          );
        } else {
          this.removeAccount(account, subscription);
        }
      });
  }

  editAccount(account) {
    const editAccountDialog = this.dialog.open(AccountDialogComponent, {
      data: { action: "Edit", dataToEdit: account, accounts: this.accounts },
      minWidth: "50%"
    });
    editAccountDialog
      .afterClosed()
      .filter(res => res)
      .subscribe(res => this.accountsService.updateData(res).subscribe());
  }

  createData(accounts, transactions): AccountsData[] {
    return accounts.map(item => {
      item.currentBalance = this.calculateBalance(item, transactions);
      return item;
    });
  }

  calculateBalance(account, transactions): number {
    let currentBalance = account.balance;
    const amount = transactions.reduce((amount, item) => {
      if (item.accountId === account.id) {
        amount += parseInt(item.type + item.amount);
      }
      return amount;
    }, 0);
    return currentBalance + amount;
  }
}
