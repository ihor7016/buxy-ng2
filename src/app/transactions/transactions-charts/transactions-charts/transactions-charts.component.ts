import { Component, OnChanges, Input } from "@angular/core";
import { ColorService } from "../../../services/color.service";
import { PieChartColor } from "./pie-chart-color.interface";
import { PieChartData } from "./pie-chart-data.interface";
import { BarChartData } from "./bar-chart-data.interface";

@Component({
  selector: "app-transactions-charts",
  templateUrl: "./transactions-charts.component.html",
  styleUrls: ["./transactions-charts.component.scss"]
})
export class TransactionsChartsComponent implements OnChanges {
  @Input() private data: any;
  public pieLabels: string[] = [];
  public pieData: number[] = [];
  public pieType: string = "pie";
  public pieLegend: boolean = true;
  public pieColors: any[] = [{ backgroundColor: [] }];
  public pieOptions: any = { legend: { position: "right" } };

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

  private piePallete: PieChartColor[] = [];
  private tagIds: string[] = [];
  private pieChartState: PieChartData = {
    tagIds: [],
    tags: [],
    amounts: [],
    colors: []
  };

  constructor(private colorService: ColorService) {}

  ngOnChanges() {
    const isPieChanged = this.checkChanges(this.createPieData());
    if (isPieChanged) {
      this.pieLabels = this.pieChartState.tags;
      this.pieColors[0].backgroundColor = this.pieChartState.colors;
      setTimeout(() => {
        this.pieData = this.pieChartState.amounts;
      }, 0);
    }
    const barData = this.createBarData();
    this.barData = [{ data: [barData.income, barData.expense] }];
  }

  createBarData(): BarChartData {
    return this.data.transactions.reduce(
      (acc, data) => this.calculateBarData(acc, data),
      {
        income: 0,
        expense: 0
      }
    );
  }

  calculateBarData(acc: BarChartData, data): BarChartData {
    let res = Object.assign({}, acc);
    if (data.type === "-") {
      res.expense += data.amountUah;
    } else {
      res.income += data.amountUah;
    }
    return res;
  }

  checkChanges(data: PieChartData): boolean {
    let isChanged = false;
    const stringData = JSON.stringify(data);
    if (stringData !== JSON.stringify(this.pieChartState)) {
      this.pieChartState = JSON.parse(stringData);
      isChanged = true;
    }
    return isChanged;
  }

  createPieData(): PieChartData {
    const expenses = this.data.transactions.filter(item => item.type === "-");
    const fullData = expenses.reduce(
      (acc, data) => this.calculatePieData(acc, data),
      {
        tagIds: [...this.tagIds],
        tags: new Array(this.tagIds.length),
        amounts: new Array(this.tagIds.length).fill(0),
        colors: new Array(this.tagIds.length)
      }
    );
    const data = this.cleanPieData(fullData);
    return data;
  }

  cleanPieData(data: PieChartData): PieChartData {
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

  calculatePieData(acc: PieChartData, data): PieChartData {
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
    return this.data.tags.find(elem => elem.id === id).name;
  }

  getColor(tagId): string {
    const colorObj = this.piePallete.find(item => item.tagId === tagId);
    let color;
    if (colorObj) {
      color = colorObj.color;
    } else {
      color = this.colorService.get();
      this.piePallete.push({
        color: color,
        tagId: tagId
      });
    }
    return color;
  }
}
