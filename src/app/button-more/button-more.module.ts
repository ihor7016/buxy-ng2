import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonMoreComponent } from "./button-more.component";
import { MaterialComponentsModule } from "../material/material.module";

@NgModule({
  imports: [CommonModule, MaterialComponentsModule],
  declarations: [ButtonMoreComponent],
  exports: [ButtonMoreComponent]
})
export class ButtonMoreModule {}
