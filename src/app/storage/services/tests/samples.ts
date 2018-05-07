import { Transaction } from "../../../interfaces/transaction.interface";

export const sampleTransaction: Transaction = {
  id: "id",
  desc: "supermarket",
  date: "2018-05-03",
  type: "-",
  amount: 550,
  accountId: "accountId",
  tagId: "tagId"
};
export const sampleTransactionList: Transaction[] = [
  {
    id: "id1",
    desc: "supermarket",
    date: "2018-05-03",
    type: "-",
    amount: 550,
    accountId: "accountId1",
    tagId: "tagId1"
  },
  {
    id: "id2",
    desc: "restaurant",
    date: "2018-05-04",
    type: "-",
    amount: 300,
    accountId: "accountId2",
    tagId: "tagId2"
  }
];
