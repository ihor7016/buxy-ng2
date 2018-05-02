import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LayoutModule } from "./layout/layout.module";
import { AuthModule } from "./auth/auth.module";
import { AppRoutes } from "./app-routing.module";
import { StorageModule } from "./storage/stotage.module";

import { AppComponent } from "./app/app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutes,
    AuthModule,
    LayoutModule,
    StorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
