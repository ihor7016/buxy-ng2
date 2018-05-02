import { Component, Input } from "@angular/core";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"]
})
export class PieChartComponent {
  @Input() public labels: string[];
  @Input() public data: number[];
  @Input() public type: string;
  @Input() public legend: boolean;
  @Input() public colors: any[];
  @Input() public options: any;
}
