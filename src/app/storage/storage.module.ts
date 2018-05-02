import { NgModule } from "@angular/core";

import { DatabaseService } from "./services/database.service";
import { TransactionsService } from "./services/transactions.service";
import { AccountsService } from "./services/accounts.service";
import { TagsService } from "./services/tags.service";

@NgModule({
  providers: [
    DatabaseService,
    TransactionsService,
    AccountsService,
    TagsService
  ]
})
export class StorageModule {}
