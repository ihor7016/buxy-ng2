import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit
} from "@angular/core";
import { MatTableDataSource, MatSort } from "@angular/material";
import { Observable } from "@firebase/util";

import { Transaction } from "../../interfaces/transaction";

@Component({
  selector: "app-table-transactions",
  templateUrl: "./table-transactions.component.html",
  styleUrls: ["./table-transactions.component.scss"]
})
export class TableTransactionsComponent implements OnInit {
  displayedColumns = ["date", "amount", "description", "tag", "account"];
  private ELEMENT_DATA: Transaction[] = [];
  public dataSource;

  @Input() data: Observable<Transaction[]>;
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
