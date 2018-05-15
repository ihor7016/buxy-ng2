import { Account } from "../../../interfaces/account.interface";
import { Tag } from "../../../interfaces/tag.interface";
import { Component, NgModule } from "@angular/core";
import { TransactionDialogComponent } from "../transaction-dialog.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialComponentsModule } from "../../../shared/material/material.module";
import { MatDialogModule } from "@angular/material";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { TransactionsDialogGroup } from "../transactions-dialog-group.interface";

export const sampleEmptyGroup: TransactionsDialogGroup = {
  id: "",
  type: "-",
  desc: "",
  amount: null,
  date: new Date("2018-05-05"),
  tagId: "",
  accountId: ""
};

export const sampleGroup: TransactionsDialogGroup = {
  id: "id2",
  type: "+",
  desc: "salary",
  amount: 2,
  date: new Date("2018-05-05"),
  tagId: "tagId2",
  accountId: "accountId2"
};

export const sampleTransaction = {
  id: "id2",
  desc: "salary",
  date: "2018-05-05",
  type: "+",
  amount: 2,
  accountId: "accountId2",
  tagId: "tagId2"
};

export const sampleForm = {
  value: {
    id: "",
    date: "",
    type: "+",
    desc: "desc",
    amount: "10",
    tagId: "tagId1",
    accountId: "accountId1"
  }
};

@Component({
  template: ""
})
export class NoopComponent {}

export const TEST_DIRECTIVES = [TransactionDialogComponent, NoopComponent];

@NgModule({
  imports: [
    ReactiveFormsModule,
    MaterialComponentsModule,
    MatDialogModule,
    NoopAnimationsModule
  ],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [TransactionDialogComponent]
})
export class DialogTestModule {}
