import { Account } from "../../interfaces/account.interface";

export interface AccountDialogData {
  action: string;
  accounts: Account[];
  dataToEdit?: Account;
}
