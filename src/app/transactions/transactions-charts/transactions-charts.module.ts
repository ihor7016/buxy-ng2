import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";

import { TransactionsChartsComponent } from "./transactions-charts/transactions-charts.component";

import { TransactionsChartsService } from "./transactions-charts/transactions-charts.service";

@NgModule({
  imports: [SharedModule],
  declarations: [TransactionsChartsComponent],
  providers: [TransactionsChartsService],
  exports: [TransactionsChartsComponent]
})
export class TransactionsChartsModule {}
