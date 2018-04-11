import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MaterialComponentsModule } from "./material/material.module";
import { AccountsModule } from "./accounts/accounts.module";
import { TagsModule } from "./tags/tags.module";
import { AppComponent } from "./app.component";
import { DrawerComponent } from "./drawer/drawer.component";
import { ContentComponent } from "./content/content.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";

@NgModule({
  declarations: [
    AppComponent,
    DrawerComponent,
    ContentComponent,
    ToolbarComponent
  ],
  imports: [
    MaterialComponentsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AccountsModule,
    TagsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
