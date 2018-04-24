import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { Transaction } from "../../interfaces/transaction";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html"
})
export class BarChartComponent implements OnInit, OnDestroy {
  @Input() data: Observable<Transaction[]>;
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
  private dataStream: Subscription;

  ngOnInit() {
    this.dataStream = this.data
      .map(list =>
        list.reduce((acc: any, data) => this.calculate(acc, data), {
          income: 0,
          expense: 0
        })
      )
      .subscribe(data => {
        console.log(data);
        this.barChartData = [{ data: [data.income, data.expense] }];
      });
  }

  calculate(acc, data) {
    let res = Object.assign({}, acc);
    console.log(data);
    if (data.type === "-") {
      res.expense += data.amountUah;
    } else {
      res.income += data.amountUah;
    }
    return res;
  }

  ngOnDestroy() {
    this.dataStream.unsubscribe();
  }
}
