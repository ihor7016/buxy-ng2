import { NgModule } from "@angular/core";

import { DatabaseService } from "./storage/database.service";
import { TransactionsService } from "./storage/transactions.service";
import { AccountsService } from "./storage/accounts.service";
import { TagsService } from "./storage/tags.service";

@NgModule({
  providers: [
    DatabaseService,
    TransactionsService,
    AccountsService,
    TagsService
  ]
})
export class StorageModule {}
