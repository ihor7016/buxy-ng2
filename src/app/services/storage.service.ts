import { Injectable } from "@angular/core";
import { DatabaseService } from "./database.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class StorageService {
  private basePath: string;
  constructor(private db: DatabaseService) {
    this.basePath = `users/defaultUserId`;
  }

  get(key: string, dataId?: string): Observable<any> {
    return dataId
      ? this.db.getData(`${this.basePath}/${key}/${dataId}`)
      : this.db.getList(`${this.basePath}/${key}`);
  }

  set(key: string, dataId?: string, data?: any) {
    let res;
    if (dataId || data) {
      if (dataId && data) {
        res = this.db.updateData(`${this.basePath}/${key}`, dataId, data);
      } else if (!dataId && data) {
        res = this.db.setData(`${this.basePath}/${key}`, data);
      } else {
        res = this.db.deleteData(`${this.basePath}/${key}`, dataId);
      }
      return res;
    }
  }
}
