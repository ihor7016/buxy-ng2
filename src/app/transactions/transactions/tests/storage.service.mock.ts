import { Observable } from "rxjs/Observable";

import { Injectable } from "@angular/core";
import { Transaction } from "../../../interfaces/transaction.interface";
import { Account } from "../../../interfaces/account.interface";
import { Tag } from "../../../interfaces/tag.interface";

export const sampleTransaction: Transaction = {
  id: "id",
  desc: "restaurant",
  date: "2018-05-03",
  type: "-",
  amount: 300,
  accountId: "accountId",
  tagId: "tagId"
};

export const sampleTransactionList: Transaction[] = [
  {
    id: "id1",
    desc: "supermarket",
    date: "2018-05-04",
    type: "-",
    amount: 500,
    accountId: "accountId1",
    tagId: "tagId1"
  },
  {
    id: "id2",
    desc: "salary",
    date: "2018-05-05",
    type: "+",
    amount: 2000,
    accountId: "accountId2",
    tagId: "tagId2"
  }
];

export const sampleAccount: Account = {
  id: "id",
  name: "account",
  balance: 300,
  currency: "$",
  type: "saving"
};

export const sampleAccountList: Account[] = [
  { id: "id1", name: "account1", balance: 500, currency: "$", type: "saving" },
  {
    id: "id2",
    name: "account2",
    balance: 1000,
    currency: "€",
    type: "checking"
  }
];

export const sampleTag: Tag = { id: "id", name: "tag" };

export const sampleTagList: Tag[] = [
  { id: "id1", name: "tag1" },
  { id: "id2", name: "tag2" }
];

export abstract class MockAbstractService<T> {
  constructor(private sampleList: T[], private sampleData: T) {}

  abstract getDataType(): string;

  getList(): Observable<T[]> {
    return Observable.of(this.sampleList);
  }

  getData(dataId: string): Observable<T> {
    return Observable.of(this.sampleData);
  }

  setData(data: T): Observable<void> {
    return Observable.of(null);
  }

  updateData(data: T): Observable<void> {
    return Observable.of(null);
  }

  deleteData(dataId: string): Observable<void> {
    return Observable.of(null);
  }
}

@Injectable()
export class MockTransactionsService extends MockAbstractService<Transaction> {
  constructor() {
    super(sampleTransactionList, sampleTransaction);
  }

  getDataType(): string {
    return "transactions";
  }
}

@Injectable()
export class MockAccountsService extends MockAbstractService<Account> {
  constructor() {
    super(sampleAccountList, sampleAccount);
  }

  getDataType(): string {
    return "transactions";
  }
}

@Injectable()
export class MockTagsService extends MockAbstractService<Tag> {
  constructor() {
    super(sampleTagList, sampleTag);
  }

  getDataType(): string {
    return "transactions";
  }
}
