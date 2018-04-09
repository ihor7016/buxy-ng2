import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatDialogModule, MatButtonModule } from "@angular/material";

import { AppComponent } from "./app.component";
import { AboutDialogComponent } from "./about-dialog/about-dialog.component";

@NgModule({
  declarations: [AppComponent, AboutDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AboutDialogComponent]
})
export class AppModule {}
