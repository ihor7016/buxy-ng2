import { Component } from "@angular/core";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html"
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
  public barChartLabels: string[] = ["Income", "Expenses"];
  public barChartType: string = "bar";
  public barChartLegend: boolean = false;

  public barChartData: any[] = [{ data: [26500, 11800] }];
  public barChartColors: any[] = [{ backgroundColor: ["#4caf50", "#f44336"] }];
}
