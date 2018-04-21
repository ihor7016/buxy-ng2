import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MaterialComponentsModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";

import { AccountsComponent } from "./accounts/accounts.component";
import { AccountDialogComponent } from "./account-dialog/account-dialog.component";
import { DatabaseService } from "../services/database.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    SharedModule
  ],
  declarations: [AccountsComponent, AccountDialogComponent],
  exports: [AccountsComponent],
  entryComponents: [AccountDialogComponent],
  providers: [DatabaseService]
})
export class AccountsModule {}
