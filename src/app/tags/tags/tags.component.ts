import { AfterContentInit, Component } from "@angular/core";
import { MatDialog } from "@angular/material";

import { TagDialogComponent } from "../tag-dialog/tag-dialog.component";
import { Tag } from "../../interfaces/tag";
import { DatabaseService } from "../../services/database.service";

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["../../styles/drawer-menu.scss"]
})
export class TagsComponent implements AfterContentInit {
  tags: Tag[];

  constructor(private dialog: MatDialog, private database: DatabaseService) {
    this.tags = [];
  }

  ngAfterContentInit() {
    this.database.getList("tags").subscribe(
      result => {
        this.tags = result as Tag[];
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
        return this.database.setData("tags", res);
      })
      .flatMap(() => {
        return this.database.getList("tags");
      })
      .subscribe(
        result => {
          this.tags = result as Tag[];
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteTag(data) {
    console.log(`delete ${data}`);
  }

  editTag() {
    console.log("editTag");
  }
}
