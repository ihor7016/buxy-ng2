import { NgModule } from "@angular/core";

import { DatabaseService } from "./storage/database.service";
import { TransactionsService } from "./storage/transactions.service";
import { AccountsService } from "./storage/accounts.service";

@NgModule({
  providers: [DatabaseService, TransactionsService, AccountsService]
})
export class StorageModule {}
