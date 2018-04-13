import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MaterialComponentsModule } from "../material/material.module";

import { TransactionsComponent } from "./transactions.component";
import { TransactionDialogComponent } from "./transaction-dialog/transaction-dialog.component";
import { TableTransactionsComponent } from "../table-transactions/table-transactions.component";

@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionDialogComponent,
    TableTransactionsComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, MaterialComponentsModule],
  exports: [TransactionsComponent],
  entryComponents: [TransactionDialogComponent]
})
export class TransactionsModule {}
