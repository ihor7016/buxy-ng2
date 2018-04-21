import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";

import { AccountDialogComponent } from "../account-dialog/account-dialog.component";
import { Account } from "../../interfaces/account";
import { DatabaseService } from "../../services/database.service";

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["../../styles/drawer-menu.scss"]
})
export class AccountsComponent {
  accounts: Account[];

  constructor(private dialog: MatDialog, private database: DatabaseService) {
    this.accounts = [];
  }

  handleAddAccountClick() {
    const addAccountDialog = this.dialog.open(AccountDialogComponent, {
      data: {
        action: "Add",
        accounts: this.accounts
      },
      minWidth: "50%"
    });
    addAccountDialog
      .afterClosed()
      .flatMap(res => {
        return this.database.setData("accounts", res);
      })
      .flatMap(() => {
        return this.database.getList("accounts");
      })
      .subscribe(result => {
        this.accounts = result as Account[];
      });
  }

  deleteAccount(data) {
    console.log(`delete ${data}`);
  }

  editAccount() {
    console.log("editAccount");
  }
}
