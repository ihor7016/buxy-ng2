import { DatabaseService } from "./database.service";
import { Observable } from "rxjs/Observable";

export abstract class AbstractService<T> {
  constructor(private db: DatabaseService) {}

  abstract getDataType(): string;

  getList(): Observable<T[]> {
    return this.db.getList<T>(this.getDataType());
  }

  getData(dataId: string): Observable<T> {
    return this.db.getData<T>(this.getDataType(), dataId);
  }

  setData(data: T): Observable<void> {
    return this.db.setData(this.getDataType(), data);
  }

  updateData(data: T): Observable<void> {
    return this.db.updateData(this.getDataType(), data);
  }

  deleteData(dataId: string): Observable<void> {
    return this.db.deleteData(this.getDataType(), dataId);
  }
}
