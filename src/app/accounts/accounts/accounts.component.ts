import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/first";
import "rxjs/add/operator/filter";

import { AccountDialogComponent } from "../account-dialog/account-dialog.component";

import { AccountsService } from "../../storage/services/accounts.service";
import { TransactionsService } from "../../storage/services/transactions.service";
import { AccountsData } from "./accounts-data.interface";

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
    const accounts = this.accountsService.getList().map(res => res.reverse());
    const transactions = this.transactionsService.getList();
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
    addAccountDialog.afterClosed().subscribe(res => {
      if (res) {
        this.accountsService.setData(res).subscribe();
      }
    });
  }

  private removeAccount(account) {
    return this.accountsService.deleteData(account.id);
  }

  private removeTransactions(transactions, account) {
    transactions.forEach((value, index, array) => {
      this.transactionsService
        .deleteData(value.id)
        .filter(() => this.isLastItem(index, array))
        .subscribe(() => this.removeAccount(account).subscribe());
    });
  }

  private isLastItem(index, array) {
    return index === array.length - 1;
  }

  deleteAccount(account) {
    this.transactionsService
      .getList()
      .first()
      .subscribe(transactions => {
        const transactionsWIthAccount = transactions.filter(
          value => value.accountId === account.id
        );
        if (transactionsWIthAccount.length > 0) {
          this.removeTransactions(transactionsWIthAccount, account);
        } else {
          this.removeAccount(account).subscribe();
        }
      });
  }

  editAccount(account) {
    const editAccountDialog = this.dialog.open(AccountDialogComponent, {
      data: { action: "Edit", dataToEdit: account, accounts: this.accounts },
      minWidth: "50%"
    });
    editAccountDialog.afterClosed().subscribe(res => {
      if (res) {
        this.accountsService.updateData(res).subscribe();
      }
    });
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
