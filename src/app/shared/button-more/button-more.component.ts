import { Component } from "@angular/core";

@Component({
  selector: "app-button-more",
  templateUrl: "./button-more.component.html"
})
export class ButtonMoreComponent {
  handleButtonMoreClick() {
    console.log("handleButtonMoreClick");
  }
}
