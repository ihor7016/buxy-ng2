import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MaterialComponentsModule } from "../material/material.module";
import { ChartsModule } from "ng2-charts";

import { TransactionsComponent } from "./transactions.component";
import { TransactionDialogComponent } from "./transaction-dialog/transaction-dialog.component";
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { TableTransactionsComponent } from "./table-transactions/table-transactions.component";
import { PieChartComponent } from "./pie-chart/pie-chart.component";

@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionDialogComponent,
    TableTransactionsComponent,
    PieChartComponent,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    ChartsModule
  ],
  exports: [TransactionsComponent],
  entryComponents: [TransactionDialogComponent]
})
export class TransactionsModule {}
