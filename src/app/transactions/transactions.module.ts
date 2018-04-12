import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MaterialComponentsModule } from "../material/material.module";

import { TransactionsComponent } from "./transactions.component";
import { TransactionDialogComponent } from "./transaction-dialog/transaction-dialog.component";

@NgModule({
  declarations: [TransactionsComponent, TransactionDialogComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialComponentsModule],
  exports: [TransactionsComponent],
  entryComponents: [TransactionDialogComponent]
})
export class TransactionsModule {}
