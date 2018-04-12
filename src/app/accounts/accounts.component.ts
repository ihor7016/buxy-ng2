import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";

import { AccountDialogComponent } from "./account-dialog/account-dialog.component";

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["../styles/drawer-menu.scss"]
})

export class AccountsComponent implements OnInit {
  accounts: Array<string>;

  constructor(private dialog: MatDialog) {}

  handleAddAccountClick() {
    const addAccountDialog = this.dialog.open(AccountDialogComponent, {
      data: { action: "Add" },
      minWidth: "50%"
    });
    addAccountDialog
      .afterClosed()
      .subscribe(res => (res ? console.log(res) : null));
  }

  ngOnInit() {
    this.accounts = Array(5)
      .fill(0)
      .map((_, i) => `Account 100USD `);
  }

  deleteAccount() {
    console.log("deleteAccount");
  }

  editAccount() {
    console.log("editAccount");
  }
}
