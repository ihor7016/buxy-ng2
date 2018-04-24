import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit
} from "@angular/core";
import { MatTableDataSource, MatSort } from "@angular/material";
import { Observable } from "rxjs/Observable";

import { Account } from "../../interfaces/account";
import { Tag } from "../../interfaces/tag";

interface ContentData {
  id: string;
  desc: string;
  date: string;
  type: string;
  amount: number;
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
export class TableTransactionsComponent implements OnInit {
  displayedColumns = ["date", "amount", "description", "tag", "account"];
  private ELEMENT_DATA: ContentData[] = [];
  public dataSource: MatTableDataSource<ContentData>;

  @Input() data: Observable<ContentData[]>;
  @Output() editClick: EventEmitter<null> = new EventEmitter();
  @Output() deleteClick: EventEmitter<null> = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.data.subscribe(results => {
      if (!results) return;
      this.ELEMENT_DATA = results;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
    });
  }

  handleEditTransaction() {
    this.editClick.emit();
  }

  handleDeleteTransaction() {
    this.deleteClick.emit();
  }
}
