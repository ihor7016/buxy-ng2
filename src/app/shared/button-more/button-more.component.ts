import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: "app-button-more",
  templateUrl: "./button-more.component.html"
})
export class ButtonMoreComponent {

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
