import { NgModule } from "@angular/core";
import { TransactionsChartsComponent } from "./transactions-charts/transactions-charts.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [SharedModule],
  declarations: [TransactionsChartsComponent],
  exports: [TransactionsChartsComponent]
})
export class TransactionsChartsModule {}
