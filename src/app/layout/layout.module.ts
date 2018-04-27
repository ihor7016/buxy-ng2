import { NgModule } from "@angular/core";

import { MaterialComponentsModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { AccountsModule } from "../accounts/accounts.module";
import { TagsModule } from "../tags/tags.module";
import { TransactionsModule } from "../transactions/transactions.module";

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
    TransactionsModule
  ],
  declarations: [
    DrawerComponent,
    ToolbarUserComponent,
    ToolbarComponent,
    NotFoundComponent
  ],
  exports: [DrawerComponent, NotFoundComponent]
})
export class LayoutModule {}
