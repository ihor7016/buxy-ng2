import { NgModule } from "@angular/core";
import {
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";

@NgModule({
  exports: [
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class MaterialComponentsModule {}
