import { Component } from "@angular/core";

@Component({
  selector: "app-button-more",
  templateUrl: "./button-more.component.html",
  styleUrls: ["./button-more.component.scss"]
})
export class ButtonMoreComponent {
  handleButtonMoreClick() {
    console.log("handleButtonMoreClick");
  }
}
