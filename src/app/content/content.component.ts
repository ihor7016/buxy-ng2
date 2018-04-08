import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from "@angular/material";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() sideBar: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

  toggleSideBar() {
this.sideBar.toggle();
  }

}
