<<<<<<< HEAD
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppComponent} from "../app.component";
import {DrawerComponent} from "../drawer/drawer.component";
=======
import {Component, EventEmitter, Output} from '@angular/core';
>>>>>>> KHWEBA-71

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent {
  @Output() toggle: EventEmitter<null> = new EventEmitter();

  constructor() {
  }

  toggleSideBar() {
    this.toggle.emit();
  }

  handleAboutClick() {
    console.log("handleAboutClick");
  }

}
