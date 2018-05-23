import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";

import { MaterialComponentsModule } from "./material/material.module";
import { ButtonMoreComponent } from "./button-more/button-more.component";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { AboutDialogComponent } from "./about-dialog/about-dialog.component";
import { ErrorComponent } from "./error/error.component";
import { BarChartComponent } from "./charts/bar-chart/bar-chart.component";
import { PieChartComponent } from "./charts/pie-chart/pie-chart.component";

import { CurrencyUahService } from "./services/currency-uah.service";
import { ColorService } from "./services/color.service";
import { ErrorService } from "./error/error.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    MaterialComponentsModule
  ],
  declarations: [
    ButtonMoreComponent,
    ConfirmDialogComponent,
    AboutDialogComponent,
    ErrorComponent,
    BarChartComponent,
    PieChartComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    ButtonMoreComponent,
    ConfirmDialogComponent,
    AboutDialogComponent,
    ErrorComponent,
    BarChartComponent,
    PieChartComponent
  ],
  providers: [CurrencyUahService, ColorService, ErrorService],
  entryComponents: [AboutDialogComponent, ConfirmDialogComponent]
})
export class SharedModule {}
