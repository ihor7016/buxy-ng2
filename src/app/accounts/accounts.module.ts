import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { AccountsComponent } from "./accounts/accounts.component";
import { AccountDialogComponent } from "./account-dialog/account-dialog.component";

import { AccountsDataService } from "./accounts/accounts-data.service";

@NgModule({
  imports: [SharedModule],
  declarations: [AccountsComponent, AccountDialogComponent],
  providers: [AccountsDataService],
  exports: [AccountsComponent],
  entryComponents: [AccountDialogComponent]
})
export class AccountsModule {}
