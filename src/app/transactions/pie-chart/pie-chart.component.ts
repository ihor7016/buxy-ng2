import { Component } from "@angular/core";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["../../styles/chart.scss"]
})
export class PieChartComponent {
  public pieChartLabels: string[] = ["Medical care", "Rent", "Leisure"];
  public pieChartData: number[] = [300, 4500, 400];
  public pieChartType: string = "pie";
}
