import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MaterialComponentsModule } from "../material/material.module";
import { ButtonMoreComponent } from "./button-more/button-more.component";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { AboutDialogComponent } from "./about-dialog/about-dialog.component";

@NgModule({
  imports: [CommonModule, MaterialComponentsModule],
  declarations: [
    ButtonMoreComponent,
    ConfirmDialogComponent,
    AboutDialogComponent
  ],
  exports: [ButtonMoreComponent, ConfirmDialogComponent, AboutDialogComponent],
  entryComponents: [AboutDialogComponent, ConfirmDialogComponent]
})
export class SharedModule {}
