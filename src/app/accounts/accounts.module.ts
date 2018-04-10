import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountsComponent } from "./accounts.component";

import { MaterialComponentsModule } from "../material/material.module";
import { ButtonMoreModule } from "../button-more/button-more.module";

@NgModule({
  imports: [CommonModule, MaterialComponentsModule, ButtonMoreModule],
  declarations: [AccountsComponent],
  exports: [AccountsComponent]
})
export class AccountsModule {}
