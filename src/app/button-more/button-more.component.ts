import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-more',
  templateUrl: './button-more.component.html',
  styleUrls: ['./button-more.component.scss']
})
export class ButtonMoreComponent {
  constructor() {
  }

  handleButtonMoreClick() {
    console.log("handleButtonMoreClick");
  }

}
