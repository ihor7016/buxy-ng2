import { NgModule } from "@angular/core";

import { DatabaseService } from "./database.service";
import { TransactionsService } from "./transactions.service";
import { CurrencyConverterUAHService } from "./currency-converter-UAH.service";

@NgModule({
  providers: [DatabaseService, TransactionsService, CurrencyConverterUAHService]
})
export class ServicesModule {}
