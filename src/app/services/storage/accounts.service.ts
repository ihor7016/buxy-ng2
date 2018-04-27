import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Account } from "../../interfaces/account";
import { DatabaseService } from "./database.service";
import { AbstractService } from "./abstract.service";

@Injectable()
export class AccountsService extends AbstractService<Account> {
  constructor(db: DatabaseService) {
    super(db);
  }

  getDataType(): string {
    return "accounts";
  }
}
