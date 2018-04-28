import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";

import { TagDialogComponent } from "../tag-dialog/tag-dialog.component";
import { Tag } from "../../interfaces/tag";
import { TagsService } from "../../services/storage/tags.service";
import { TransactionsService } from "../../services/storage/transactions.service";

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["../../styles/drawer-menu.scss"]
})
export class TagsComponent implements OnInit {
  tags: Tag[];

  constructor(
    private dialog: MatDialog,
    private tagsService: TagsService,
    private transactionsService: TransactionsService
  ) {
    this.tags = [];
  }

  ngOnInit() {
    this.tagsService.getList().subscribe(result => {
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
        this.tagsService.setData(res).subscribe();
      }
    });
  }

  deleteTag(tag) {
    this.tagsService.deleteData(tag.id).subscribe();
    this.transactionsService.getList().subscribe(transactions => {
      transactions.filter(value => value.tagId === tag.id).forEach(value => {
        this.transactionsService.deleteData(value.id).subscribe();
      });
    });
  }

  editTag() {
    console.log("editTag");
  }
}
