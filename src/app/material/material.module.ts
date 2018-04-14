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
  MatCardModule
  MatTableModule,
  MatSortModule
} from "@angular/material";
import { CdkTableModule } from "@angular/cdk/table";

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
    MatCardModule
    MatTableModule,
    CdkTableModule,
    MatSortModule
  ]
})
export class MaterialComponentsModule {}
