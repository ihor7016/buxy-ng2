import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Transaction } from "../interfaces/transaction";
import { DatabaseService } from "./database.service";

@Injectable()
export class TransactionsService {
  private dataType: string = "transactions";
  constructor(private db: DatabaseService) {}

  getList(): Observable<{}[]> {
    return this.db.getList(this.dataType);
  }

  getData(dataId: string): Observable<{}> {
    return this.db.getData(this.dataType, dataId);
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
