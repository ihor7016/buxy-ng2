import { Injectable } from "@angular/core";
import { Account } from "../../interfaces/account.interface";
import { Transaction } from "../../interfaces/transaction.interface";

@Injectable()
export class AccountsDataService {
  calculateBalance(account: Account, transactions: Transaction[]): number {
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
