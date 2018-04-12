import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MaterialComponentsModule } from "./material/material.module";
import { AccountsModule } from "./accounts/accounts.module";
import { TagsModule } from "./tags/tags.module";
import { TransactionsModule } from "./transactions/transactions.module";

import { AppComponent } from "./app.component";
import { DrawerComponent } from "./drawer/drawer.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";

@NgModule({
  declarations: [AppComponent, DrawerComponent, ToolbarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    AccountsModule,
    TagsModule,
    TransactionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
