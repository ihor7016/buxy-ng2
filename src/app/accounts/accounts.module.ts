import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MaterialComponentsModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";

import { AccountsComponent } from "./accounts.component";
import { AccountDialogComponent } from "./account-dialog/account-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    SharedModule
  ],
  declarations: [AccountsComponent, AccountDialogComponent],
  exports: [AccountsComponent],
  entryComponents: [AccountDialogComponent]
})
export class AccountsModule {}
