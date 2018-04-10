import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialComponentsModule } from "./material/material.module";

import { TransactionsModule } from "./transactions/transactions.module";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    TransactionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
