import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { DatabaseService } from "./database.service";
import { AbstractService } from "./abstract.service";

import { Transaction } from "../interfaces/transaction";

@Injectable()
export class TransactionsService extends AbstractService<Transaction> {
  constructor(db: DatabaseService) {
    super(db);
  }

  getDataType(): string {
    return "transactions";
  }
}
