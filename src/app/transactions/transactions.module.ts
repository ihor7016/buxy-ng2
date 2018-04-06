import { NgModule } from "@angular/core";
import {
  MatDialogModule,
  MatButtonModule,
  MatIconModule
} from "@angular/material";

import { TransactionsComponent } from "./transactions.component";
import { TransactionDialogComponent } from '../transaction-dialog/transaction-dialog.component';

@NgModule({
  declarations: [TransactionsComponent, TransactionDialogComponent],
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  exports: [TransactionsComponent],
  providers: []
})
export class TransactionsModule {}
