import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MaterialComponentsModule } from "./material/material.module";
import { AppComponent } from "./app.component";
import { DrawerModule } from "./drawer/drawer.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    MaterialComponentsModule,
    BrowserModule,
    BrowserAnimationsModule,
    DrawerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
