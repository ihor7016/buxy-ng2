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
import { AboutDialogComponent } from "./about-dialog/about-dialog.component";

import { AuthModule } from "./auth/auth.module";
import { AuthComponent } from "./auth/auth.component";
import { AppRoutes } from "./app-routing.module";
import { MainComponent } from "./main/main.component";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
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
    AppRoutes,
    AuthModule,
    TransactionsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AboutDialogComponent]
})
export class AppModule {}
