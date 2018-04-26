import { Component, Input, OnInit, OnDestroy, OnChanges } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/toArray";
import "rxjs/add/observable/from";
import { ColorService } from "../../services/color.service";
import { DatabaseService } from "../../services/database.service";

import { Transaction } from "../../interfaces/transaction";
import { Tag } from "../../interfaces/tag";
import { Subscriber } from "rxjs/Subscriber";

interface PieChartData {
  tagIds: string[];
  tags: string[];
  amounts: number[];
  colors: string[];
}

interface Color {
  tagId: string;
  color: string;
}

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  providers: [ColorService]
})
export class PieChartComponent implements OnInit, OnChanges, OnDestroy {
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: string = "pie";
  public pieChartLegend: boolean = true;
  public pieChartColors: any[] = [{ backgroundColor: [] }];
  public pieChartOptions: any = {
    legend: { position: "right" }
  };

  @Input() private transactions: Observable<Transaction[]>;
  @Input() private tags: Observable<Tag[]>;
  private dataStream: Subscription;
  private chartData: PieChartData = {
    tagIds: [],
    tags: [],
    amounts: [],
    colors: []
  };
  public pallete: Color[] = [];

  constructor(
    private colorService: ColorService,
    private db: DatabaseService
  ) {}

  ngOnInit() {
    this.pieChartData = this.chartData.amounts;
    this.pieChartColors[0].backgroundColor = this.chartData.colors;
    this.pieChartLabels = this.chartData.tags;
    const expenses = this.transactions.map(list =>
      list.filter(item => item.type === "-")
    );
    Observable.combineLatest(expenses, this.tags, (expenses, tags) => {
      return { expenses: expenses, tags: tags };
    })
      .map(data => {
        const pieData = data.expenses.reduce(
          (acc, data) => this.calculate(acc, data),
          {
            tagIds: [],
            tags: [],
            amounts: [],
            colors: []
          }
        );
        pieData.tagIds.map(
          (id, i) =>
            (pieData.tags[i] = data.tags.find(elem => elem.id === id).name)
        );
        return pieData;
      })
      .subscribe(data => {
        this.chartData = data;
        this.pieChartData = this.chartData.amounts;
        this.pieChartColors[0].backgroundColor = this.chartData.colors;
        this.pieChartLabels = this.chartData.tags;
      });
  }

  calculate(acc: PieChartData, data: Transaction): PieChartData {
    const i = acc.tagIds.indexOf(data.tagId);
    const color = this.pallete.find(color => color.tagId === data.tagId);
    if (i < 0) {
      acc.tagIds.push(data.tagId);
      acc.amounts.push(data.amountUah);
      color
        ? acc.colors.push(color.color)
        : acc.colors.push(this.colorService.get());
    } else {
      acc.amounts[i] += data.amountUah;
    }
    return acc;
  }

  ngOnChanges() {
    this.pieChartData = this.chartData.amounts;
    this.pieChartColors[0].backgroundColor = this.chartData.colors;
    this.pieChartLabels = this.chartData.tags;
    console.log(this.pieChartData);
    console.log(this.pieChartLabels);
  }

  ngOnDestroy() {
    // this.dataStream.unsubscribe();
  }
}

//   this.dataStream = this.transactions
//     .map(list => list.filter(item => item.type === "-"))
//     .map(
//       list =>
//         (this.chartData = list.reduce(
//           (acc, data) => this.calculate(acc, data),
//           {
//             tagIds: [],
//             tags: null,
//             amounts: [],
//             colors: [{ backgroundColor: [] }]
//           }
//         ))
//     )
//     .mergeMap(data => this.getTagNames(data))
//     .subscribe(data => {
//       console.log(data);
//       this.chartData.tags = data;
//       console.log(this.chartData);
//       this.pieChartData = this.chartData.amounts;
//       this.pieChartColors[0].backgroundColor = this.chartData.colors;
//       this.pieChartLabels = data;
//     });
// }

// getTagNames(data: PieChartData) {
//   let names = data.tagIds.map(id =>
//     this.db.getData<Tag>("tags", id).map(tag => tag.name)
//   );
//   return Observable.combineLatest(names);
// }
