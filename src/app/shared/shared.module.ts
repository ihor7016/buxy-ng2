import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MaterialComponentsModule } from "../material/material.module";
import { ButtonMoreComponent } from "./button-more/button-more.component";
import { AboutDialogComponent } from "./about-dialog/about-dialog.component";

@NgModule({
  imports: [CommonModule, MaterialComponentsModule],
  declarations: [ButtonMoreComponent, AboutDialogComponent],
  exports: [ButtonMoreComponent, AboutDialogComponent]
})
export class SharedModule {}
