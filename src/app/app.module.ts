import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CdkTableModule } from "@angular/cdk/table";
import { MatTableModule } from "@angular/material/table";

import { MaterialComponentsModule } from "./material/material.module";
import { AccountsModule } from "./accounts/accounts.module";
import { TagsModule } from "./tags/tags.module";
import { TransactionsModule } from "./transactions/transactions.module";
import { DrawerComponent } from "./drawer/drawer.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { AboutDialogComponent } from "./about-dialog/about-dialog.component";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [
    AppComponent,
    DrawerComponent,
    ToolbarComponent,
    AboutDialogComponent
  ],
  imports: [
    CdkTableModule,
    MatTableModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    AccountsModule,
    TagsModule,
    TransactionsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AboutDialogComponent]
})
export class AppModule {}
