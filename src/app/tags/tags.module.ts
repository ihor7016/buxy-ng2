import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TagsComponent } from "./tags.component";

import { MaterialComponentsModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [CommonModule, MaterialComponentsModule, SharedModule],
  declarations: [TagsComponent],
  exports: [TagsComponent]
})
export class TagsModule {}
