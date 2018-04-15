import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material";

import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-button-more",
  templateUrl: "./button-more.component.html"
})
export class ButtonMoreComponent {
  @Input() position: string;
  @Input() data: { type: string; name: any };
  @Output() editClick: EventEmitter<null> = new EventEmitter();
  @Output() deleteClick: EventEmitter<null> = new EventEmitter();
  constructor(private dialog: MatDialog) {}

  handleEditClick() {
    this.editClick.emit();
  }

  handleDeleteClick() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: this.data,
      minWidth: "50%"
    });
    confirmDialog
      .afterClosed()
      .subscribe(res => (res ? this.deleteClick.emit() : null));
  }
}
