import { Component, OnChanges, Input } from "@angular/core";
import { TransactionsChartsService } from "./transactions-charts.service";

import { PieChartData } from "./interfaces/pie-chart-data.interface";
import { BarChartData } from "./interfaces/bar-chart-data.interface";
import { TransactionsData } from "../../transactions/transactions-data.interface";

@Component({
  selector: "app-transactions-charts",
  templateUrl: "./transactions-charts.component.html",
  styleUrls: ["./transactions-charts.component.scss"]
})
export class TransactionsChartsComponent implements OnChanges {
  @Input() private data: TransactionsData;
  public pieLabels: string[] = [];
  public pieData: number[] = [];
  public pieType: string = "pie";
  public pieLegend: boolean = true;
  public pieColors: any[] = [{ backgroundColor: [] }];
  public pieOptions: any = { legend: { position: "right" } };

  public barLabels: string[] = ["Income", "Expenses"];
  public barType: string = "bar";
  public barLegend: boolean = false;
  public barData: any[] = [{ data: [] }];
  public barColors: any[] = [{ backgroundColor: ["#4caf50", "#f44336"] }];
  public barOptions: any = {
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

  constructor(private chartsService: TransactionsChartsService) {}

  ngOnChanges() {
    this.updateBarData();
    this.updatePieData();
  }

  updateBarData() {
    const barData: BarChartData = this.chartsService.createBarData(this.data);
    this.barData = [{ data: [barData.income, barData.expense] }];
  }

  updatePieData() {
    const pieData: PieChartData = this.chartsService.createPieData(this.data);
    if (this.chartsService.isChanged(this.pieLabels, pieData.tags)) {
      this.pieLabels = pieData.tags;
      this.pieColors[0].backgroundColor = pieData.colors;
      setTimeout(() => {
        this.pieData = pieData.amounts;
      }, 0);
    } else if (this.chartsService.isChanged(this.pieData, pieData.amounts)) {
      this.pieData = pieData.amounts;
    }
  }
}
