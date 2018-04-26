import { Component, Input, OnInit, OnDestroy } from "@angular/core";
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
import { stringToByteArray } from "@firebase/util";
import { combineLatest } from "rxjs/observable/combineLatest";

interface PieChartData {
  tagIds: string[];
  tags: string[];
  amounts: number[];
  colors: { backgroundColor: string[] }[];
}

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  providers: [ColorService]
})
export class PieChartComponent implements OnInit, OnDestroy {
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: string = "pie";
  public pieChartLegend: boolean = true;
  public pieChartColors: any[] = [];
  public pieChartOptions: any = {
    legend: { position: "right" }
  };

  @Input() private pieData: Observable<Transaction[]>;
  private dataStream: Subscription;
  private chartData: PieChartData;

  constructor(
    private colorService: ColorService,
    private db: DatabaseService
  ) {}

  ngOnInit() {
    this.dataStream = this.pieData
      .map(list => list.filter(item => item.type === "-"))
      .map(
        list =>
          (this.chartData = list.reduce(
            (acc, data) => this.calculate(acc, data),
            {
              tagIds: [],
              tags: null,
              amounts: [],
              colors: [{ backgroundColor: [] }]
            }
          ))
      )
      .mergeMap(data => this.getTagNames(data))
      .subscribe(data => {
        console.log(data);
        this.chartData.tags = data;
        console.log(this.chartData);
        this.pieChartData = this.chartData.amounts;
        this.pieChartColors = this.chartData.colors;
        this.pieChartLabels = data;
      });
  }

  calculate(acc: PieChartData, data: Transaction): PieChartData {
    let res = Object.assign({}, acc);
    const i = acc.tagIds.indexOf(data.tagId);
    if (i < 0) {
      res.tagIds.push(data.tagId);
      res.amounts.push(data.amountUah);
      res.colors[0].backgroundColor.push(this.colorService.get());
    } else {
      res.amounts[i] += data.amountUah;
    }
    return res;
  }

  getTagNames(data: PieChartData) {
    let names = data.tagIds.map(id =>
      this.db.getData<Tag>("tags", id).map(tag => tag.name)
    );
    return Observable.combineLatest(names);
  }

  ngOnDestroy() {
    this.dataStream.unsubscribe();
  }
}
