import { Component, OnChanges, Input } from "@angular/core";
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
  public pieLabels: string[] = [];
  public pieData: number[] = [];
  public pieType: string = "pie";
  public pieLegend: boolean = true;
  public pieColors: any[] = [{ backgroundColor: [] }];
  public pieOptions: any = { legend: { position: "right" } };

  private pallete: PieChartColor[] = [];
  private tagIds: string[] = [];
  private chartState: PieChartData = {
    tagIds: [],
    tags: [],
    amounts: [],
    colors: []
  };

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
  public barLabels: string[] = ["Income", "Expenses"];
  public barType: string = "bar";
  public barLegend: boolean = false;

  public barData: any[] = [{ data: [200, 300] }];
  public barColors: any[] = [{ backgroundColor: ["#4caf50", "#f44336"] }];

  constructor(private colorService: ColorService) {}

  ngOnChages() {}

  initCharts() {}

  ngOnChanges() {
    const isChanged = this.checkChanges(this.createData());
    if (isChanged) {
      this.pieLabels = this.chartState.tags;
      this.pieColors[0].backgroundColor = this.chartState.colors;
      setTimeout(() => {
        this.pieData = this.chartState.amounts;
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
