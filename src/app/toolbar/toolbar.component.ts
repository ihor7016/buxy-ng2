import {Component, EventEmitter, Output} from '@angular/core';

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
