import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CdkTableModule } from "@angular/cdk/table";
import { MatTableModule } from "@angular/material/table";

import { AppComponent } from "./app.component";
import { TableTransactionsComponent } from "./table-transactions/table-transactions.component";

@NgModule({
  declarations: [AppComponent, TableTransactionsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CdkTableModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
