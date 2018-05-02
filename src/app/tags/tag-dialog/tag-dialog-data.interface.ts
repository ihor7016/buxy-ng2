import { Tag } from "../../interfaces/tag.interface";

export interface TagDialogData {
  action: string;
  tags: Tag[];
  dataToEdit?: Tag;
}
