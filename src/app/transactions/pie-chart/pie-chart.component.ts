import { Component, Input, OnChanges } from "@angular/core";
import { ColorService } from "../../shared/services/color.service";
import { PieChartColor } from "./pie-chart-color.interface";
import { PieChartData } from "./pie-chart-data.interface";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"]
})
export class PieChartComponent implements OnChanges {
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: string = "pie";
  public pieChartLegend: boolean = true;
  public pieChartColors: any[] = [{ backgroundColor: [] }];
  public pieChartOptions: any = {
    legend: { position: "right" }
  };

  @Input() private chartData: any;
  private pallete: PieChartColor[] = [];
  private tagIds: string[] = [];
  private chartState: PieChartData = {
    tagIds: [],
    tags: [],
    amounts: [],
    colors: []
  };

  constructor(private colorService: ColorService) {}

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
}
