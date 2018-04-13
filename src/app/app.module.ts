import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { firebase } from "../environments/firebase.config";

import { MaterialComponentsModule } from "./material/material.module";
import { AccountsModule } from "./accounts/accounts.module";
import { TagsModule } from "./tags/tags.module";
import { TransactionsModule } from "./transactions/transactions.module";

import { AppComponent } from "./app.component";
import { DrawerComponent } from "./drawer/drawer.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { AboutDialogComponent } from "./about-dialog/about-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    DrawerComponent,
    ToolbarComponent,
    AboutDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    AccountsModule,
    TagsModule,
    TransactionsModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AboutDialogComponent]
})
export class AppModule {}
