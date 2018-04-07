import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatToolbarModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {MatSidenavContainerModule} from '@angular/material';
import {MatSidenavContentModule} from '@angular/material';
import {MatNavListModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material';



import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DrawerComponent } from './drawer/drawer.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DrawerComponent

  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    BrowserModule,
    MatSidenavContainerModule,
    MatNavListModule,
    MatSidenavContentModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
