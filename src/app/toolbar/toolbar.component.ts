import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppComponent} from "../app.component";
import {DrawerComponent} from "../drawer/drawer.component";
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggle: EventEmitter<null> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  toggleSideBar() {
    this.toggle.emit();
  }

}
