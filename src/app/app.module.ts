import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CdkTableModule } from "@angular/cdk/table";
import { MatTableModule } from "@angular/material/table";
import { ChartsModule } from "ng2-charts";

import { AppComponent } from "./app.component";
import { BarChartComponent } from "./bar-chart/bar-chart.component";

@NgModule({
  declarations: [AppComponent, BarChartComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    CdkTableModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
