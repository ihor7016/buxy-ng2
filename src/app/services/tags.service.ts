import { DatabaseService } from "./database.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Tag } from "../interfaces/tag";
@Injectable()
export class TagsService {
  constructor(private db: DatabaseService) {}

  getAll(): Observable<{}[]> {
    return this.db.getList("tags");
  }

  set(tag: Tag): Observable<void> {
    return this.db.setData("tags", tag);
  }
}
