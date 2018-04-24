import { AfterContentInit, Component } from "@angular/core";
import { MatDialog } from "@angular/material";

import { TagDialogComponent } from "../tag-dialog/tag-dialog.component";
import { Tag } from "../../interfaces/tag";
import { TagsService } from "../../services/tags.service";

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["../../styles/drawer-menu.scss"]
})
export class TagsComponent implements AfterContentInit {
  tags: Tag[];

  constructor(private dialog: MatDialog, private database: TagsService) {
    this.tags = [];
  }

  ngAfterContentInit() {
    this.database.getAll().subscribe(
      result => {
        this.tags = result.reverse();
      },
      error => {
        console.log(error);
      }
    );
  }

  handleAddTagClick() {
    const addTagDialog = this.dialog.open(TagDialogComponent, {
      data: { action: "Add", tags: this.tags },
      minWidth: "50%"
    });
    addTagDialog
      .afterClosed()
      .flatMap(res => {
        return this.database.set(res);
      })
      .subscribe(result => {});
  }

  deleteTag(data) {
    console.log(`delete ${data}`);
  }

  editTag() {
    console.log("editTag");
  }
}
