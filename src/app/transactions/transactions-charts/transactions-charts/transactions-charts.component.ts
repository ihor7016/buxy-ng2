import { Component, OnChanges, Input } from "@angular/core";
import { ColorService } from "../../../services/color.service";

import { PieChartColor } from "./interfaces/pie-chart-color.interface";
import { PieChartData } from "./interfaces/pie-chart-data.interface";
import { BarChartData } from "./interfaces/bar-chart-data.interface";
import { TransactionUah } from "../../transactions/transaction-uah.interface";
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

  private pallete: PieChartColor[] = [];
  private tagIds: string[] = [];

  constructor(private colorService: ColorService) {}

  ngOnChanges() {
    const barData = this.createBarData();
    this.barData = [{ data: [barData.income, barData.expense] }];
    const pieData = this.createPieData();
    const isPieChanged = this.checkChanges(pieData);
    if (isPieChanged) {
      this.pieLabels = pieData.tags;
      this.pieColors[0].backgroundColor = pieData.colors;
      setTimeout(() => {
        this.pieData = pieData.amounts;
      }, 0);
    }
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

  calculateBarData(acc: BarChartData, data: TransactionUah): BarChartData {
    let res = Object.assign({}, acc);
    if (data.type === "-") {
      res.expense += data.amountUah;
    } else {
      res.income += data.amountUah;
    }
    return res;
  }

  checkChanges(data: PieChartData): boolean {
    let isChanged =
      this.isChanged(this.pieLabels, data.tags) ||
      this.isChanged(this.pieData, data.amounts) ||
      this.isChanged(this.pieColors[0].backgroundColor, data.colors);
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
    const tags = [...data.tags];
    const tagIds = [...data.tagIds];
    const colors = [...data.colors];
    const amounts = [...data.amounts];
    amounts.filter((amount, i) => {
      if (!amount) {
        tags.filter((elem, index) => i !== index);
        tagIds.filter((elem, index) => i !== index);
        colors.filter((elem, index) => i !== index);
        return;
      }
      return amount;
    });
    return {
      tags: tags,
      tagIds: tagIds,
      amounts: amounts,
      colors: colors
    };
  }

  calculatePieData(acc: PieChartData, data: TransactionUah): PieChartData {
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

  getTagName(id: string): string {
    return this.data.tags.find(elem => elem.id === id).name;
  }

  getColor(tagId: string): string {
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

  isChanged(oldData, newData): boolean {
    return JSON.stringify(oldData) !== JSON.stringify(newData);
  }
}
