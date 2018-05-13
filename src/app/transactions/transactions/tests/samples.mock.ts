import { Transaction } from "../../../interfaces/transaction.interface";
import { Account } from "../../../interfaces/account.interface";
import { Tag } from "../../../interfaces/tag.interface";
import { TransactionsData } from "../transactions-data.interface";
import { Observable } from "rxjs/Observable";

export const sampleTransaction: Transaction = {
  id: "id2",
  desc: "restaurant",
  date: "2018-05-03",
  type: "-",
  amount: 1,
  accountId: "accountId1",
  tagId: "tagId1"
};

export const sampleTransactionList: Transaction[] = [
  {
    id: "id1",
    desc: "supermarket",
    date: "2018-05-04",
    type: "-",
    amount: 1,
    accountId: "accountId1",
    tagId: "tagId1"
  },
  {
    id: "id2",
    desc: "salary",
    date: "2018-05-05",
    type: "+",
    amount: 2,
    accountId: "accountId2",
    tagId: "tagId2"
  },
  {
    id: "id3",
    desc: "supermarket",
    date: "2018-05-06",
    type: "-",
    amount: 100,
    accountId: "accountId3",
    tagId: "tagId2"
  }
];

export const sampleAccount: Account = {
  id: "accountId",
  name: "account",
  balance: 300,
  currency: "$",
  type: "saving"
};

export const sampleAccountList: Account[] = [
  {
    id: "accountId1",
    name: "account1",
    balance: 500,
    currency: "$",
    type: "saving"
  },
  {
    id: "accountId2",
    name: "account2",
    balance: 1000,
    currency: "€",
    type: "checking"
  },
  {
    id: "accountId3",
    name: "account3",
    balance: 1000,
    currency: "₴",
    type: "checking"
  }
];

export const sampleTag: Tag = { id: "tagId", name: "tag" };

export const sampleTagList: Tag[] = [
  { id: "tagId1", name: "tag1" },
  { id: "tagId2", name: "tag2" }
];

export const sampleData: TransactionsData = {
  transactions: [
    {
      id: "id1",
      desc: "supermarket",
      date: "2018-05-04",
      type: "-",
      amount: 1,
      amountUah: 27,
      accountId: "accountId1",
      tagId: "tagId1"
    },
    {
      id: "id2",
      desc: "salary",
      date: "2018-05-05",
      type: "+",
      amount: 2,
      amountUah: 66,
      accountId: "accountId2",
      tagId: "tagId2"
    },
    {
      id: "id3",
      desc: "supermarket",
      date: "2018-05-06",
      type: "-",
      amount: 100,
      amountUah: 100,
      accountId: "accountId3",
      tagId: "tagId2"
    }
  ],
  accounts: sampleAccountList,
  tags: sampleTagList
};
