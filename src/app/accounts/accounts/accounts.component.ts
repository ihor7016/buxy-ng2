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
import { AccountsDataService } from "./accounts-data.service";

import { AccountsData } from "./accounts-data.interface";
import { Transaction } from "../../interfaces/transaction.interface";
import { Account } from "../../interfaces/account.interface";

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.scss"]
})
export class AccountsComponent implements OnInit, OnDestroy {
  accounts: AccountsData[];

  private subscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private accountsService: AccountsService,
    private transactionsService: TransactionsService,
    private dataService: AccountsDataService
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
    )
      .map(res => this.createData(res.accounts, res.transactions))
      .subscribe(res => (this.accounts = res));
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

  private removeAccount(account: Account): Observable<void> {
    return this.accountsService.deleteData(account.id);
  }

  private removeTransactions(transactions: Transaction[], account: Account) {
    transactions.forEach((value, index, array) => {
      this.transactionsService
        .deleteData(value.id)
        .filter(() => this.isLastItem(index, array))
        .subscribe(() => this.removeAccount(account).subscribe());
    });
  }

  private isLastItem(index: number, array: Transaction[]) {
    return index === array.length - 1;
  }

  deleteAccount(account: Account) {
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

  editAccount(account: Account) {
    const editAccountDialog = this.dialog.open(AccountDialogComponent, {
      data: { action: "Edit", dataToEdit: account, accounts: this.accounts },
      minWidth: "50%"
    });
    editAccountDialog
      .afterClosed()
      .filter(res => res)
      .subscribe(res => this.accountsService.updateData(res).subscribe());
  }

  createData(accounts: Account[], transactions: Transaction[]): AccountsData[] {
    return accounts.map(item => {
      const newItem: any = Object.assign({}, item);
      newItem.currentBalance = this.dataService.calculateBalance(
        item,
        transactions
      );
      return <AccountsData>newItem;
    });
  }
}
