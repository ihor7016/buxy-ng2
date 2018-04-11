import { Component } from "@angular/core";
import { DataSource } from "@angular/cdk/table";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"]
})
export class BarChartComponent {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{ barPercentage: 0.5 }],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontFamily: "'Roboto', sans-serif",
            fontStyle: "500"
          }
        }
      ]
    }
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
