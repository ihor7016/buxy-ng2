import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags: Array<string>;

  constructor() {
  }

  handleAddTagClick() {
    console.log("handleAddTagClick");
  }

  ngOnInit() {
    this.tags = Array(5).fill(0).map((_, i) => `Tag`);
  }

}
