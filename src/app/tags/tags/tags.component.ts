import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";

import { TagDialogComponent } from "../tag-dialog/tag-dialog.component";
import { Tag } from "../../interfaces/tag.interface";
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

  private removeTag(tag, subscription) {
    this.tagsService.deleteData(tag.id).subscribe();
    subscription.unsubscribe();
  }

  private removeTransactions(transactions, tag, subscription) {
    transactions
      .filter(value => value.tagId === tag.id)
      .forEach((value, index, array) => {
        this.transactionsService.deleteData(value.id).subscribe(res => {
          if (index === array.length - 1) {
            this.tagsService.deleteData(tag.id).subscribe();
            subscription.unsubscribe();
          }
        });
      });
  }

  deleteTag(tag) {
    const subscription = this.transactionsService
      .getList()
      .subscribe(transactions => {
        if (transactions.length > 0) {
          this.removeTransactions(transactions, tag, subscription);
        } else {
          this.removeTag(tag, subscription);
        }
      });
  }

  editTag() {
    console.log("editTag");
  }
}
