import { Component, Input, OnChanges } from "@angular/core";

interface BarChartData {
  income: number;
  expense: number;
}

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html"
})
export class BarChartComponent implements OnChanges {
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

  public barChartData: any[] = [{ data: [0, 0] }];
  public barChartColors: any[] = [{ backgroundColor: ["#4caf50", "#f44336"] }];

  @Input() private chartData: any;

  ngOnChanges() {
    const data = this.createData();
    this.barChartData = [{ data: [data.income, data.expense] }];
  }

  createData(): BarChartData {
    return this.chartData.transactions.reduce(
      (acc, data) => this.calculate(acc, data),
      {
        income: 0,
        expense: 0
      }
    );
  }

  calculate(acc: BarChartData, data): BarChartData {
    let res = Object.assign({}, acc);
    if (data.type === "-") {
      res.expense += data.amountUah;
    } else {
      res.income += data.amountUah;
    }
    return res;
  }
}
