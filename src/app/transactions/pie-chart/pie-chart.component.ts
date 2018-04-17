import { Component } from "@angular/core";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html"
})
export class PieChartComponent {
  public pieChartLabels: string[] = ["Medical care", "Rent", "Leisure"];
  public pieChartData: number[] = [300, 4500, 400];
  public pieChartType: string = "pie";
  public pieChartColors: any[] = [
    { backgroundColor: ["#4caf50", "#9c27b0", "#f44336"] }
  ];
  public pieChartOptions: any = {
    legend: { position: "right" }
  };
}
