import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MaterialComponentsModule } from "./material/material.module";
import { ButtonMoreComponent } from "./button-more/button-more.component";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { AboutDialogComponent } from "./about-dialog/about-dialog.component";

import { CurrencyUahService } from "./services/currency-uah.service";
import { ColorService } from "./services/color.service";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialComponentsModule],
  declarations: [
    ButtonMoreComponent,
    ConfirmDialogComponent,
    AboutDialogComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    ButtonMoreComponent,
    ConfirmDialogComponent,
    AboutDialogComponent
  ],
  providers: [CurrencyUahService, ColorService],
  entryComponents: [AboutDialogComponent, ConfirmDialogComponent]
})
export class SharedModule {}
