import { Account } from "../../interfaces/account.interface";
import { Tag } from "../../interfaces/tag.interface";

export interface TransactionDialogData {
  action: string;
  accounts: Account[];
  tags: Tag[];
  dataToEdit?: any;
}
