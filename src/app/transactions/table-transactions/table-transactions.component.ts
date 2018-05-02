import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnChanges
} from "@angular/core";
import { MatTableDataSource, MatSort } from "@angular/material";

import { TableTransactionsData } from "./table-transactions-data.interface";

@Component({
  selector: "app-table-transactions",
  templateUrl: "./table-transactions.component.html",
  styleUrls: ["./table-transactions.component.scss"]
})
export class TableTransactionsComponent implements OnChanges {
  public displayedColumns = ["date", "amount", "description", "tag", "account"];
  public dataSource: MatTableDataSource<TableTransactionsData>;

  @Input() tableData: any;
  @Output() editClick: EventEmitter<any> = new EventEmitter();
  @Output() deleteClick: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges() {
    const data = this.createData();
    this.dataSource = new MatTableDataSource(data);
    this.createSorting();
  }

  handleEditTransaction(data) {
    this.editClick.emit({ data: data });
  }

  handleDeleteTransaction(id) {
    this.deleteClick.emit({ id: id });
  }

  createData(): TableTransactionsData[] {
    const data = this.tableData.transactions.reverse();
    const newData = data.map(item => this.extractData(item));
    return newData;
  }

  extractData(data): TableTransactionsData {
    const newData = Object.assign({}, data);
    newData.account = this.tableData.accounts.find(
      item => item.id === data.accountId
    );
    newData.tag = this.tableData.tags.find(item => item.id === data.tagId);
    return newData;
  }

  createSorting() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case "amount":
          return parseInt(item.type + item.amountUah);
        case "desc":
          return item.desc.toLowerCase();
        case "tag":
          return item.tag.name.toLowerCase();
        case "account":
          return item.account.name.toLowerCase();
        default:
          return item[property];
      }
    };
    this.dataSource.sort = this.sort;
  }
}
