import { Component, OnChanges, Input, SimpleChange } from "@angular/core";
import { ColorService } from "../../../services/color.service";
import { PieChartColor } from "./pie-chart-color.interface";
import { PieChartData } from "./pie-chart-data.interface";

@Component({
  selector: "app-transactions-charts",
  templateUrl: "./transactions-charts.component.html",
  styleUrls: ["./transactions-charts.component.scss"]
})
export class TransactionsChartsComponent implements OnChanges {
  @Input() private chartData: any;
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: string = "pie";
  public pieChartLegend: boolean = true;
  public pieChartColors: any[] = [{ backgroundColor: [] }];
  public pieChartOptions: any = { legend: { position: "right" } };

  private pallete: PieChartColor[] = [];
  private tagIds: string[] = [];
  private chartState: PieChartData = {
    tagIds: [],
    tags: [],
    amounts: [],
    colors: []
  };

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

  public barChartData: any[] = [{ data: [200, 300] }];
  public barChartColors: any[] = [{ backgroundColor: ["#4caf50", "#f44336"] }];

  pieData: any;
  barData: any;

  constructor(private colorService: ColorService) {}

  ngOnInit() {
    this.barData = {
      barChartOptions: this.barChartOptions,
      barChartLabels: this.barChartLabels,
      barChartType: this.barChartType,
      barChartLegend: this.barChartLegend,
      barChartData: this.barChartData,
      barChartColors: this.barChartColors
    };
  }

  ngOnChages(change: SimpleChange) {
    // if (change.isFirstChange) {
    //   this.initCharts();
    // } else {
    this.pieData = {
      pieChartLabels: this.pieChartLabels,
      pieChartData: this.pieChartData,
      pieChartType: this.pieChartType,
      pieChartLegend: this.pieChartLegend,
      pieChartColors: this.pieChartColors,
      pieChartOptions: this.pieChartOptions
    };
  }

  initCharts() {}

  ngOnChanges() {
    const isChanged = this.checkChanges(this.createData());
    if (isChanged) {
      this.pieChartLabels = this.chartState.tags;
      this.pieChartColors[0].backgroundColor = this.chartState.colors;
      setTimeout(() => {
        this.pieChartData = this.chartState.amounts;
      }, 0);
    }
  }

  checkChanges(data: PieChartData): boolean {
    let isChanged = false;
    const stringData = JSON.stringify(data);
    if (stringData !== JSON.stringify(this.chartState)) {
      this.chartState = JSON.parse(stringData);
      isChanged = true;
    }
    return isChanged;
  }

  createData(): PieChartData {
    const expenses = this.chartData.transactions.filter(
      item => item.type === "-"
    );
    const fullData = expenses.reduce((acc, data) => this.calculate(acc, data), {
      tagIds: [...this.tagIds],
      tags: new Array(this.tagIds.length),
      amounts: new Array(this.tagIds.length).fill(0),
      colors: new Array(this.tagIds.length)
    });
    const data = this.cleanData(fullData);
    return data;
  }

  cleanData(data: PieChartData): PieChartData {
    const cleanData = JSON.parse(JSON.stringify(data));
    cleanData.amounts = data.amounts.filter((amount, i) => {
      if (!amount) {
        cleanData.tagIds = data.tagIds.filter((elem, index) => i !== index);
        cleanData.tags = data.tags.filter((elem, index) => i !== index);
        cleanData.colors = data.colors.filter((elem, index) => i !== index);
        return;
      }
      return amount;
    });
    return cleanData;
  }

  calculate(acc: PieChartData, data): PieChartData {
    const i = acc.tagIds.indexOf(data.tagId);
    if (i < 0) {
      this.tagIds.push(data.tagId);
      acc.tagIds.push(data.tagId);
      acc.amounts.push(data.amountUah);
      acc.colors.push(this.getColor(data.tagId));
      acc.tags.push(this.getTagName(data.tagId));
    } else {
      acc.amounts[i] += data.amountUah;
      acc.colors[i] = this.getColor(data.tagId);
      acc.tags[i] = this.getTagName(data.tagId);
    }
    return acc;
  }

  getTagName(id): string {
    return this.chartData.tags.find(elem => elem.id === id).name;
  }

  getColor(tagId): string {
    const colorObj = this.pallete.find(item => item.tagId === tagId);
    let color;
    if (colorObj) {
      color = colorObj.color;
    } else {
      color = this.colorService.get();
      this.pallete.push({
        color: color,
        tagId: tagId
      });
    }
    return color;
  }

  // -----------------------------------------------------------------------------

  // ngOnChanges() {
  //   const data = this.createData();
  //   this.barChartData = [{ data: [data.income, data.expense] }];
  // }

  // createData(): BarChartData {
  //   return this.chartData.transactions.reduce(
  //     (acc, data) => this.calculate(acc, data),
  //     {
  //       income: 0,
  //       expense: 0
  //     }
  //   );
  // }

  // calculate(acc: BarChartData, data): BarChartData {
  //   let res = Object.assign({}, acc);
  //   if (data.type === "-") {
  //     res.expense += data.amountUah;
  //   } else {
  //     res.income += data.amountUah;
  //   }
  //   return res;
  // }
}
