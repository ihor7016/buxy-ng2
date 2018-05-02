import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";

import { TagsComponent } from "./tags/tags.component";
import { TagDialogComponent } from "./tag-dialog/tag-dialog.component";

@NgModule({
  imports: [SharedModule],
  declarations: [TagsComponent, TagDialogComponent],
  exports: [TagsComponent],
  entryComponents: [TagDialogComponent]
})
export class TagsModule {}
