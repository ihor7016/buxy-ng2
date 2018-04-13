import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MaterialComponentsModule } from "../material/material.module";
import { CdkTableModule } from "@angular/cdk/table";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";

import { TransactionsComponent } from "./transactions.component";
import { TransactionDialogComponent } from "./transaction-dialog/transaction-dialog.component";
import { TableTransactionsComponent } from "../table-transactions/table-transactions.component";

@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionDialogComponent,
    TableTransactionsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CdkTableModule,
    MatTableModule,
    MatSortModule,
    MaterialComponentsModule
  ],
  exports: [TransactionsComponent],
  entryComponents: [TransactionDialogComponent]
})
export class TransactionsModule {}
