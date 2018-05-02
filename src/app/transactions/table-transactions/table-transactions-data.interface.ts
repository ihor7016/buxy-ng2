import { Account } from "../../interfaces/account.interface";
import { Tag } from "../../interfaces/tag.interface";

export interface TableTransactionsData {
  id: string;
  desc: string;
  date: string;
  type: string;
  amount: number;
  amountUah: number;
  accountId: string;
  tagId: string;
  account: Account;
  tag: Tag;
}
