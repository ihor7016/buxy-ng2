import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { TransactionDialogComponent } from "../transaction-dialog/transaction-dialog.component";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent {
  accounts: any[];
  tags: string[];

  _getList;
  _getData;

  constructor(private dialog: MatDialog, private storage: DatabaseService) {
    this.accounts = [
      { name: "Cash", id: "ibf3y0kuv4" },
      { name: "BoaBank", id: "w2dvndxoz7n" },
      { name: "Private", id: "tfcmw2vqfgk" }
    ];
    this.tags = [
      "Rent",
      "Restaurant",
      "Salary",
      "Groceries",
      "Entertainment",
      "Building"
    ];
  }

  getList() {
    this.storage
      .getList("accounts")
      .subscribe(value => (this._getList = value));
  }

  getObject() {
    this.storage
      .getData("accounts", "--LAU6ucZkDWaPAzRFB7P")
      .subscribe(value => (this._getData = JSON.stringify(value)));
  }

  setObject() {
    const accs = [
      {
        name: "Privat",
        balance: 500,
        type: "savings",
        currency: "EUR"
      },
      { name: "Cash", balance: 2000, type: "cash", currency: "UAH" }
    ];
    const trans = {
      desc: "trip",
      type: "-",
      amount: 1000,
      date: "2018-04-13",
      tagId: "-LACFMj8hJwpsOygBfJL",
      accountId: "-LACFMj8hJwpsOygBfJL"
    };
    const tag = { name: "transport" };
    this.storage.setData("accounts", accs[0]).subscribe();
  }

  updateObject() {
    const acc = {
      id: "--LAU6ucZkDWaPAzRFB7P",
      name: "Cash",
      balance: 2000,
      type: "cash",
      currency: "UAH"
    };
    this.storage.updateData("accounts", acc).subscribe();
  }

  deleteObject() {
    this.storage.deleteData("accounts", "--LAU6ucZkDWaPAzRFB7P").subscribe();
  }

  editTransaction() {
    console.log("editTransaction");
  }

  deleteTransaction() {
    console.log("deleteTransaction");
  }

  handleAddTransactionClick() {
    const addTransactionDialog = this.dialog.open(TransactionDialogComponent, {
      data: { action: "Add", accounts: this.accounts, tags: this.tags },
      minWidth: "50%"
    });
    addTransactionDialog
      .afterClosed()
      .subscribe(res => (res ? console.log(res) : null));
  }
}
