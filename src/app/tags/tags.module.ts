import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TagsComponent } from "./tags.component";

import { MaterialComponentsModule } from "../material/material.module";
import { ButtonMoreModule } from "../button-more/button-more.module";

@NgModule({
  imports: [CommonModule, MaterialComponentsModule, ButtonMoreModule],
  declarations: [TagsComponent],
  exports: [TagsComponent]
})
export class TagsModule {}
