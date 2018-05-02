export interface Transaction {
  id: string;
  desc: string;
  date: string;
  type: string;
  amount: number;
  accountId: string;
  tagId: string;
}
