import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";

import { TagDialogComponent } from "../tag-dialog/tag-dialog.component";
import { Tag } from "../../interfaces/tag";
import { TagsService } from "../../services/storage/tags.service";

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["../../styles/drawer-menu.scss"]
})
export class TagsComponent implements OnInit {
  tags: Tag[];

  constructor(private dialog: MatDialog, private database: TagsService) {
    this.tags = [];
  }

  ngOnInit() {
    this.database.getList().subscribe(result => {
      this.tags = result.reverse();
    });
  }

  handleAddTagClick() {
    const addTagDialog = this.dialog.open(TagDialogComponent, {
      data: { action: "Add", tags: this.tags },
      minWidth: "50%"
    });

    addTagDialog.afterClosed().subscribe(res => {
      if (res) {
        this.database.setData(res).subscribe();
      }
    });
  }

  deleteTag(data) {
    console.log(`delete ${data}`);
  }

  editTag() {
    console.log("editTag");
  }
}
