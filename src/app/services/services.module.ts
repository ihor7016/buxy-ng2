import { NgModule } from "@angular/core";

import { DatabaseService } from "./database.service";
import { TransactionsService } from "./transactions.service";

@NgModule({
  providers: [DatabaseService, TransactionsService]
})
export class ServicesModule {}
