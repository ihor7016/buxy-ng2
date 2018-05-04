import { Injectable } from "@angular/core";
import { ColorService } from "../../../shared/services/color.service";

import { PieChartData } from "./interfaces/pie-chart-data.interface";
import { BarChartData } from "./interfaces/bar-chart-data.interface";
import { PieChartTags } from "./interfaces/pie-chart-tags.interface";
import { TransactionUah } from "../../transactions/transaction-uah.interface";
import { TransactionsData } from "../../transactions/transactions-data.interface";
import { Tag } from "../../../interfaces/tag.interface";

@Injectable()
export class TransactionsChartsService {
  private tagsData: PieChartTags[] = [];

  constructor(private colorService: ColorService) {}

  createBarData(transactionsData: TransactionsData): BarChartData {
    return transactionsData.transactions.reduce(
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

  createPieData(transactionsData: TransactionsData): PieChartData {
    const expenses: TransactionUah[] = transactionsData.transactions.filter(
      item => item.type === "-"
    );
    const fullData: PieChartData = expenses.reduce(
      (acc, transaction) =>
        this.calculatePieData(acc, transaction, transactionsData.tags),
      {
        tagIds: this.tagsData.map(tag => tag.id),
        tags: new Array(this.tagsData.length),
        amounts: new Array(this.tagsData.length).fill(0),
        colors: this.tagsData.map(tag => tag.color)
      }
    );
    const data: PieChartData = this.cleanPieData(fullData);
    return data;
  }

  calculatePieData(
    acc: PieChartData,
    data: TransactionUah,
    tags: Tag[]
  ): PieChartData {
    const i = acc.tagIds.indexOf(data.tagId);
    if (i < 0) {
      acc.tagIds.push(data.tagId);
      acc.amounts.push(data.amountUah);
      acc.colors.push(this.getTagColor(data.tagId));
      acc.tags.push(this.getTagName(data.tagId, tags));
    } else {
      acc.amounts[i] += data.amountUah;
      acc.tags[i] = this.getTagName(data.tagId, tags);
    }
    return acc;
  }

  cleanPieData(data: PieChartData): PieChartData {
    let tags: string[] = [...data.tags];
    let tagIds: string[] = [...data.tagIds];
    let colors: string[] = [...data.colors];
    let amounts: number[] = [...data.amounts];
    amounts = amounts.filter((amount, i) => {
      if (!amount) {
        tags = tags.filter((elem, index) => i !== index);
        tagIds = tagIds.filter((elem, index) => i !== index);
        colors = colors.filter((elem, index) => i !== index);
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

  getTagName(id: string, tags: Tag[]): string {
    return tags.find(elem => elem.id === id).name;
  }

  getTagColor(id: string): string {
    const newData = {
      id: id,
      color: this.colorService.get()
    };
    this.tagsData.push(newData);
    return newData.color;
  }

  isChanged(oldData: any, newData: any): boolean {
    return JSON.stringify(oldData) !== JSON.stringify(newData);
  }
}
