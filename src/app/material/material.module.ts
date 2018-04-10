import { NgModule } from "@angular/core";
import {
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatRadioModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";

@NgModule({
  exports: [
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatNativeDateModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule
  ]
})
export class MaterialComponentsModule {}
