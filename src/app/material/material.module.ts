import { NgModule } from "@angular/core";
import {
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  MatRadioModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatSortModule
} from "@angular/material";
import { CdkTableModule } from "@angular/cdk/table";
import { ChartsModule } from "ng2-charts";

@NgModule({
  exports: [
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    CdkTableModule,
    MatSortModule,
    ChartsModule
  ]
})
export class MaterialComponentsModule {}
