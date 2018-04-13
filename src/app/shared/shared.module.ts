import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialComponentsModule } from "../material/material.module";

import { ButtonMoreComponent } from "./button-more/button-more.component";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";

@NgModule({
  imports: [CommonModule, MaterialComponentsModule],
  declarations: [ButtonMoreComponent, ConfirmDialogComponent],
  exports: [ButtonMoreComponent, ConfirmDialogComponent]
})
export class SharedModule {}
