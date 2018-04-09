import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DrawerComponent } from './drawer/drawer.component';
import {MaterialComponentsModule} from './material/material.module';
import { ContentComponent } from './content/content.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TagsComponent } from './tags/tags.component';
import { ButtonMoreComponent } from './button-more/button-more.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DrawerComponent,
    ContentComponent,
    AccountsComponent,
    TagsComponent,
    ButtonMoreComponent

  ],
  imports: [
    MaterialComponentsModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
