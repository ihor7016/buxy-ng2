import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnChanges
} from "@angular/core";
import { MatTableDataSource, MatSort } from "@angular/material";

import { Account } from "../../interfaces/account";
import { Tag } from "../../interfaces/tag";

interface ContentData {
  id: string;
  desc: string;
  date: string;
  type: string;
  amount: number;
  amountUah: number;
  accountId: string;
  tagId: string;
  account: Account;
  tag: Tag;
}

@Component({
  selector: "app-table-transactions",
  templateUrl: "./table-transactions.component.html",
  styleUrls: ["./table-transactions.component.scss"]
})
export class TableTransactionsComponent implements OnChanges {
  displayedColumns = ["date", "amount", "description", "tag", "account"];
  private ELEMENT_DATA: ContentData[] = [];
  public dataSource: MatTableDataSource<ContentData>;

  @Input() tableData: any;
  @Output() editClick: EventEmitter<null> = new EventEmitter();
  @Output() deleteClick: EventEmitter<null> = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges() {
    const data = this.createData();
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
  }

  handleEditTransaction() {
    this.editClick.emit();
  }

  handleDeleteTransaction() {
    this.deleteClick.emit();
  }

  createData(): ContentData[] {
    const data = this.tableData.transactions.reverse();
    const newData = data.map(item => this.extractData(item));
    return newData;
  }

  extractData(data): ContentData {
    const newData = Object.assign({}, data);
    newData.account = this.tableData.accounts.find(
      item => item.id === data.accountId
    );
    newData.tag = this.tableData.tags.find(item => item.id === data.tagId);
    return newData;
  }
}
