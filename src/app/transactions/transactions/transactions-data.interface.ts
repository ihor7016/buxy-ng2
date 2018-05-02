import { TransactionUah } from "./transaction-uah.interface";
import { Account } from "../../interfaces/account.interface";
import { Tag } from "../../interfaces/tag.interface";

export interface TransactionsData {
  transactions: TransactionUah[];
  accounts: Account[];
  tags: Tag[];
}
