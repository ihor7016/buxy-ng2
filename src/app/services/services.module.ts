import { NgModule } from "@angular/core";

import { DatabaseService } from "./database.service";
import { TransactionsService } from "./transactions.service";
import { CurrencyUahService } from "./currency-uah.service";
import { ColorService } from "./color.service";

@NgModule({
  providers: [
    DatabaseService,
    TransactionsService,
    CurrencyUahService,
    ColorService
  ]
})
export class ServicesModule {}
