import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { TagDialogComponent } from "./tag-dialog/tag-dialog.component";

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["../styles/drawer-menu.scss"]
})
export class TagsComponent implements OnInit {
  tags: Array<string>;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.tags = Array(5)
      .fill(0)
      .map((_, i) => `Tag`);
  }

  deleteTag() {
    console.log("deleteTag");
  }

  editTag() {
    console.log("editTag");
  }

  handleAddTagClick() {
    const addTagDialog = this.dialog.open(TagDialogComponent, {
      data: { action: "Add" },
      minWidth: "50%"
    });
    addTagDialog
      .afterClosed()
      .subscribe(res => (res ? console.log(res) : null));
  }
}
