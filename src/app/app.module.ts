import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LayoutModule } from "./layout/layout.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { AppRoutes } from "./app-routing.module";
import { MainComponent } from "./main/main.component";
import { AboutDialogComponent } from "./shared/about-dialog/about-dialog.component";

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutes,
    AuthModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
