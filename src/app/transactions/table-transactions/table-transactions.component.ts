import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort } from "@angular/material";

@Component({
  selector: "app-table-transactions",
  templateUrl: "./table-transactions.component.html",
  styleUrls: ["./table-transactions.component.scss"]
})
export class TableTransactionsComponent {
  displayedColumns = ["date", "amount", "description", "tag", "account"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @Output() editClick: EventEmitter<null> = new EventEmitter();
  @Output() deleteClick: EventEmitter<null> = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  handleEditTransaction() {
    this.editClick.emit();
  }

  handleDeleteTransaction() {
    this.deleteClick.emit();
  }
}

const ELEMENT_DATA: any[] = [
  {
    date: "19.03.2018",
    type: "-",
    amount: 200,
    description: "tennis",
    id: "id1",
    tag: { name: "hobby" },
    account: {
      name: "KredoBank",
      type: "debitcard",
      currency: "$"
    }
  },
  {
    date: "22.03.2018",
    type: "-",
    amount: 5000,
    description: "rent payment",
    id: "id2",
    tag: { name: "rent" },
    account: {
      name: "PravexBank",
      type: "creditcard",
      currency: "€"
    }
  },
  {
    date: "02.04.2018",
    type: "-",
    amount: 300,
    description: "fishing",
    id: "id3",
    tag: { name: "hobby" },
    account: {
      name: "KredoBank",
      type: "debitcard",
      currency: "₴"
    }
  }
];
