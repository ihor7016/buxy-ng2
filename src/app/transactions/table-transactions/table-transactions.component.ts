import { Component, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort } from "@angular/material";

export interface Element {
  date: string;
  amount: number;
  description: string;
  tag: string;
  account: string;
}

@Component({
  selector: "app-table-transactions",
  templateUrl: "./table-transactions.component.html",
  styleUrls: ["./table-transactions.component.scss"]
})
export class TableTransactionsComponent {
  displayedColumns = ["date", "amount", "description", "tag", "account"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  editTransaction() {
    console.log("editTransaction");
  }

  deleteTransaction() {
    console.log("deleteTransaction");
  }
}

const ELEMENT_DATA: Element[] = [
  {
    date: "19.03.2018",
    amount: 200,
    description: "tennis",
    tag: "hobby",
    account: "KredoBank, debitcard"
  },
  {
    date: "22.03.2018",
    amount: 5000,
    description: "rent payment",
    tag: "rent",
    account: "PravexBank, creditcard"
  },
  {
    date: "02.04.2018",
    amount: 300,
    description: "fishing",
    tag: "hobby",
    account: "KredoBank, debitcard"
  }
];
