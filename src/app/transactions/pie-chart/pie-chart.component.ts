import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ColorService } from "../../services/color.service";

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
  styleUrls: ["./pie-chart.component.scss"],
  providers: [ColorService]
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
  private pallete: Color[] = [];
  private tagIds: string[] = [];
  private chartState: PieChartData = {
    tagIds: [],
    tags: [],
    amounts: [],
    colors: []
  };

  constructor(private colorService: ColorService) {}

  ngOnChanges(changes: SimpleChanges) {
    const data = JSON.stringify(this.createData());
    if (data !== JSON.stringify(this.chartState)) {
      this.chartState = JSON.parse(data);
      this.pieChartLabels = this.chartState.tags;
      this.pieChartColors[0].backgroundColor = this.chartState.colors;
      setTimeout(() => {
        this.pieChartData = this.chartState.amounts;
      }, 0);
    }
  }

  createData(): PieChartData {
    const expenses = this.chartData.transactions.filter(
      item => item.type === "-"
    );
    const fullData = expenses.reduce((acc, data) => this.calculate(acc, data), {
      tagIds: [...this.tagIds],
      tags: [],
      amounts: new Array(this.tagIds.length).fill(0),
      colors: []
    });
    const data = this.cleanData(fullData);
    console.log(fullData);
    console.log(data);
    return data;
  }

  cleanData(data: PieChartData): PieChartData {
    const cleanData = JSON.parse(JSON.stringify(data));
    cleanData.amounts.forEach((amount, i) => {
      if (!amount) {
        cleanData.tagIds.splice(i, 1);
        cleanData.tags.splice(i, 1);
        cleanData.amounts.splice(i, 1);
        cleanData.colors.splice(i, 1);
      }
    });
    return cleanData;
  }

  calculate(acc: PieChartData, data): PieChartData {
    const i = acc.tagIds.indexOf(data.tagId);
    console.log(this.tagIds);
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
