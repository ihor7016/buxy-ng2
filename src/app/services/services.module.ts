import { NgModule } from "@angular/core";

import { DatabaseService } from "./database.service";
import { TransactionsService } from "./transactions.service";
import { CurrencyUahService } from "./currency-uah.service";

@NgModule({
  providers: [DatabaseService, TransactionsService, CurrencyUahService]
})
export class ServicesModule {}
