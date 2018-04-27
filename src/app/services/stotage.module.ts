import { NgModule } from "@angular/core";

import { DatabaseService } from "./storage/database.service";
import { TransactionsService } from "./storage/transactions.service";

@NgModule({
  providers: [DatabaseService, TransactionsService]
})
export class StorageModule {}
