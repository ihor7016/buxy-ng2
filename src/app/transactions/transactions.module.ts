import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MaterialComponentsModule } from "../material/material.module";
import { ChartsModule } from "ng2-charts";
import { SharedModule } from "../shared/shared.module";

import { TransactionsComponent } from "./transactions/transactions.component";
import { TransactionDialogComponent } from "./transaction-dialog/transaction-dialog.component";
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { PieChartComponent } from "./pie-chart/pie-chart.component";
import { TableTransactionsComponent } from "./table-transactions/table-transactions.component";

import { DatabaseService } from "../services/database.service";

@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionDialogComponent,
    TableTransactionsComponent,
    BarChartComponent,
    PieChartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    ChartsModule,
    SharedModule
  ],
  exports: [TransactionsComponent],
  providers: [DatabaseService],
  entryComponents: [TransactionDialogComponent]
})
export class TransactionsModule {}
