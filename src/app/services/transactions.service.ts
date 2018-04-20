import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Transaction } from "../interfaces/transaction";
import { DatabaseService } from "./database.service";

@Injectable()
export class TransactionsService {
  private dataType: string = "transactions";
  constructor(private db: DatabaseService) {}

  getList(): Observable<Transaction[]> {
    return this.db.getList(this.dataType).map((list: Transaction[]) => list);
  }

  getData(dataId: string): Observable<Transaction> {
    return this.db
      .getData(this.dataType, dataId)
      .map((data: Transaction) => data);
  }

  setData(data: Transaction): Observable<void> {
    return this.db.setData(this.dataType, data);
  }

  updateData(data: Transaction): Observable<void> {
    return this.db.updateData(this.dataType, data);
  }

  deleteData(dataId: string): Observable<void> {
    return this.db.deleteData(this.dataType, dataId);
  }
}
