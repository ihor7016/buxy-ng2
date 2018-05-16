import { TransactionsDialogGroup } from "../transactions-dialog-group.interface";
import { Transaction } from "../../../interfaces/transaction.interface";

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

export const sampleTransaction: Transaction = {
  id: "id2",
  desc: "salary",
  date: "2018-05-05",
  type: "+",
  amount: 2,
  accountId: "accountId2",
  tagId: "tagId2"
};
