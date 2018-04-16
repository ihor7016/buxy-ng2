import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LayoutModule } from "./layout/layout.module";

import { AppComponent } from "./app/app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, LayoutModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
