import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountsComponent } from "./accounts.component";

import { MaterialComponentsModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [CommonModule, MaterialComponentsModule, SharedModule],
  declarations: [AccountsComponent],
  exports: [AccountsComponent]
})
export class AccountsModule {}
