import { Observable } from "rxjs/Observable";

import { Injectable } from "@angular/core";
import { Transaction } from "../../../interfaces/transaction.interface";
import { Account } from "../../../interfaces/account.interface";
import { Tag } from "../../../interfaces/tag.interface";
import {
  sampleTransactionList,
  sampleTransaction,
  sampleAccountList,
  sampleAccount,
  sampleTagList,
  sampleTag
} from "./samples.mock";

export abstract class MockAbstractService<T> {
  constructor(private sampleList: T[], private sampleData: T) {}

  getList(): Observable<T[]> {
    console.log(Observable.of(this.sampleList));
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
}

@Injectable()
export class MockAccountsService extends MockAbstractService<Account> {
  constructor() {
    super(sampleAccountList, sampleAccount);
  }
}

@Injectable()
export class MockTagsService extends MockAbstractService<Tag> {
  constructor() {
    super(sampleTagList, sampleTag);
  }
}
