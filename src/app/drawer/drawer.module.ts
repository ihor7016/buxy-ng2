import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialComponentsModule } from "../material/material.module";
import { DrawerComponent } from "./drawer.component";
import { AccountsModule } from "../accounts/accounts.module";
import { TagsModule } from "../tags/tags.module";
import { ContentComponent } from "../content/content.component";
import { ToolbarComponent } from "../toolbar/toolbar.component";

@NgModule({
  imports: [CommonModule, MaterialComponentsModule, AccountsModule, TagsModule],
  declarations: [DrawerComponent, ContentComponent, ToolbarComponent],
  exports: [DrawerComponent]
})
export class DrawerModule {}
