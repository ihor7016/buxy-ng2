import { Component, Input, OnChanges } from "@angular/core";
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

  constructor(private colorService: ColorService) {}

  ngOnChanges() {
    const data = this.createData();
    this.pieChartLabels = data.tags;
    this.pieChartColors[0].backgroundColor = data.colors;
    setTimeout(() => {
      this.pieChartData = data.amounts;
    }, 0);
  }

  createData(): PieChartData {
    const expenses = this.chartData.transactions.filter(
      item => item.type === "-"
    );
    const data = expenses.reduce((acc, data) => this.calculate(acc, data), {
      tagIds: [],
      tags: [],
      amounts: [],
      colors: []
    });
    return data;
  }

  calculate(acc: PieChartData, data): PieChartData {
    const i = acc.tagIds.indexOf(data.tagId);
    if (i < 0) {
      acc.tagIds.push(data.tagId);
      acc.amounts.push(data.amountUah);
      acc.colors.push(this.getColor(data.tagId));
      acc.tags.push(this.getTagName(data.tagId));
    } else {
      acc.amounts[i] += data.amountUah;
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
