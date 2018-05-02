import { Component, Input } from "@angular/core";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html"
})
export class BarChartComponent {
  @Input() data: any;
  // @Input() public barChartOptions: any;
  // @Input() public barChartLabels: string[];
  // @Input() public barChartType: string;
  // @Input() public barChartLegend: boolean;
  // @Input() public barChartData: any[];
  // @Input() public barChartColors: any[];
}
