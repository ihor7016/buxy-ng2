import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { AccountsComponent } from "./accounts/accounts.component";
import { AccountDialogComponent } from "./account-dialog/account-dialog.component";

@NgModule({
  imports: [SharedModule],
  declarations: [AccountsComponent, AccountDialogComponent],
  exports: [AccountsComponent],
  entryComponents: [AccountDialogComponent]
})
export class AccountsModule {}
