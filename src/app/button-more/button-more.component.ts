import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button-more',
  templateUrl: './button-more.component.html',
  styleUrls: ['./button-more.component.scss']
})
export class ButtonMoreComponent{
  constructor() {
  }

  @Input() position: string;
  @Output() editClick: EventEmitter<null> = new EventEmitter();
  @Output() deleteClick: EventEmitter<null> = new EventEmitter();

  handleEditClick() {
    this.editClick.emit();

  }

  handleDeleteClick() {
    this.deleteClick.emit();

  }

}
