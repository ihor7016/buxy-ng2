import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/first";

import { TagDialogComponent } from "../tag-dialog/tag-dialog.component";
import { Tag } from "../../interfaces/tag.interface";
import { TagsService } from "../../storage/services/tags.service";
import { TransactionsService } from "../../storage/services/transactions.service";

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["./tags.component.scss"]
})
export class TagsComponent implements OnInit, OnDestroy {
  tags: Tag[];

  private subscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private tagsService: TagsService,
    private transactionsService: TransactionsService
  ) {
    this.tags = [];
  }

  ngOnInit() {
    this.subscription = this.tagsService.getList().subscribe(result => {
      this.tags = result.reverse();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleAddTagClick() {
    const addTagDialog = this.dialog.open(TagDialogComponent, {
      data: { action: "Add", tags: this.tags },
      minWidth: "50%"
    });

    addTagDialog
      .afterClosed()
      .filter(res => res)
      .subscribe(res => this.tagsService.setData(res).subscribe());
  }

  private removeTag(tag, subscription) {
    this.tagsService.deleteData(tag.id).subscribe();
    subscription.unsubscribe();
  }

  private removeTransactions(transactions, tag, subscription) {
    transactions.forEach((value, index, array) => {
      this.transactionsService.deleteData(value.id).subscribe(() => {
        if (this.isLastItem(index, array)) {
          this.removeTag(tag, subscription);
        }
      });
    });
  }

  private isLastItem(index, array) {
    return index === array.length - 1;
  }

  deleteTag(tag) {
    const subscription = this.transactionsService
      .getList()
      .first()
      .subscribe(transactions => {
        const transactionsWithTagToRemove = transactions.filter(
          value => value.tagId === tag.id
        );
        if (transactionsWithTagToRemove.length > 0) {
          this.removeTransactions(
            transactionsWithTagToRemove,
            tag,
            subscription
          );
        } else {
          this.removeTag(tag, subscription);
        }
      });
  }

  editTag(tag) {
    const editTagDialog = this.dialog.open(TagDialogComponent, {
      data: { action: "Edit", dataToEdit: tag, tags: this.tags },
      minWidth: "50%"
    });
    editTagDialog
      .afterClosed()
      .filter(res => res)
      .subscribe(res => this.tagsService.updateData(res).subscribe());
  }
}
