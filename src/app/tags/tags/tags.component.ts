import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";

import { TagDialogComponent } from "../tag-dialog/tag-dialog.component";
import { Tag } from "../../interfaces/tag";

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["../../styles/drawer-menu.scss"]
})
export class TagsComponent implements OnInit {
  tags: Tag[];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.tags = [
      {
        id: "id1",
        name: "Transport"
      },
      {
        id: "id2",
        name: "Rent"
      },
      {
        id: "id3",
        name: "Restaurant"
      }
    ];
  }

  handleAddTagClick() {
    const addTagDialog = this.dialog.open(TagDialogComponent, {
      data: { action: "Add", tags: this.tags },
      minWidth: "50%"
    });
    addTagDialog
      .afterClosed()
      .subscribe(res => (res ? console.log(res) : null));
  }

  deleteTag(data) {
    console.log(`delete ${data}`);
  }

  editTag() {
    console.log("editTag");
  }
}
