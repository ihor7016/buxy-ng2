import {Component, OnInit} from '@angular/core';

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["../styles/drawer-menu.scss"]
})

export class TagsComponent implements OnInit {
  tags: Array<string>;

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
    console.log("handleAddTagClick");
  }
}
