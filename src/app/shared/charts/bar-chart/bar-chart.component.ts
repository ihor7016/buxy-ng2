import { Component, Input } from "@angular/core";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html"
})
export class BarChartComponent {
  @Input() public options: any;
  @Input() public labels: string[];
  @Input() public type: string;
  @Input() public legend: boolean;
  @Input() public data: any[];
  @Input() public colors: any[];
}
