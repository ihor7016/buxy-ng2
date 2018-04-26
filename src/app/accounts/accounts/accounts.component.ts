import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";

import { AccountDialogComponent } from "../account-dialog/account-dialog.component";
import { Account } from "../../interfaces/account";
import { AccountsService } from "../../services/accounts.service";

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["../../styles/drawer-menu.scss"]
})
export class AccountsComponent implements OnInit {
  accounts: Account[];

  constructor(private dialog: MatDialog, private database: AccountsService) {
    this.accounts = [];
  }

  ngOnInit() {
    this.database.getList().subscribe(result => {
      this.accounts = result.reverse();
    });
  }

  handleAddAccountClick() {
    const addAccountDialog = this.dialog.open(AccountDialogComponent, {
      data: {
        action: "Add",
        accounts: this.accounts
      },
      minWidth: "50%"
    });
    addAccountDialog.afterClosed().subscribe(res => {
      this.database.setData(res).subscribe();
    });
  }

  deleteAccount(data) {
    console.log(`delete ${data}`);
  }

  editAccount() {
    console.log("editAccount");
  }
}
