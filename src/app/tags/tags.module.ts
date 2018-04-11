import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MaterialComponentsModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";

import { TagsComponent } from "./tags.component";
import { TagDialogComponent } from "./tag-dialog/tag-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    SharedModule
  ],
  declarations: [TagsComponent, TagDialogComponent],
  exports: [TagsComponent],
  entryComponents: [TagDialogComponent]
})
export class TagsModule {}
