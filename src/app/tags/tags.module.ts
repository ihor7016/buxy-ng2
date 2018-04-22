import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MaterialComponentsModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";

import { TagsComponent } from "./tags/tags.component";
import { TagDialogComponent } from "./tag-dialog/tag-dialog.component";
import { DatabaseService } from "../services/database.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    SharedModule
  ],
  declarations: [TagsComponent, TagDialogComponent],
  exports: [TagsComponent],
  entryComponents: [TagDialogComponent],
  providers: [DatabaseService]
})
export class TagsModule {}
