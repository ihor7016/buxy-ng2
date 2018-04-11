import { Component } from "@angular/core";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"]
})
export class BarChartComponent {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType: string = "bar";
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [26500], label: "Income" },
    { data: [11800], label: "Expenses" }
  ];
  public barChartColors: any[] = [
    { backgroundColor: ["#4caf50"] },
    { backgroundColor: ["#f44336"] }
  ];
}
