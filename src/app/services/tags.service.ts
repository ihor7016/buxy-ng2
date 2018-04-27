import { Injectable } from "@angular/core";
import { Tag } from "../interfaces/tag";
import { DatabaseService } from "./database.service";
import { AbstractService } from "./abstract.service";

@Injectable()
export class TagsService extends AbstractService<Tag> {
  constructor(db: DatabaseService) {
    super(db);
  }

  getDataType(): string {
    return "tags";
  }
}
