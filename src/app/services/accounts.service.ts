import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Account } from "../interfaces/account";
import { DatabaseService } from "./database.service";

@Injectable()
export class AccountsService {
  constructor(private db: DatabaseService) {}

  getAll(): Observable<{}[]> {
    return this.db.getList("accounts");
  }

  set(account: Account): Observable<void> {
    return this.db.setData("accounts", account);
  }
}
