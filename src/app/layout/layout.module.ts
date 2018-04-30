import { NgModule } from "@angular/core";

import { MaterialComponentsModule } from "../material/material.module";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { AccountsModule } from "../accounts/accounts.module";
import { TagsModule } from "../tags/tags.module";
import { TransactionsModule } from "../transactions/transactions.module";

import { LayoutComponent } from "./layout/layout.component";
import { DrawerComponent } from "./drawer/drawer.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { ToolbarUserComponent } from "./toolbar/user-button/user-button.component";
import { NotFoundComponent } from "./not-found/not-found.component";

@NgModule({
  imports: [
    MaterialComponentsModule,
    SharedModule,
    AccountsModule,
    TagsModule,
    TransactionsModule,
    CommonModule
  ],
  declarations: [
    LayoutComponent,
    DrawerComponent,
    ToolbarUserComponent,
    ToolbarComponent,
    NotFoundComponent
  ],
  exports: [LayoutComponent, NotFoundComponent]
})
export class LayoutModule {}
