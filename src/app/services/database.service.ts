import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "angularfire2/database";
import { Observable } from "rxjs/Observable";

@Injectable()
export class DatabaseService {
  // private basePath: string;
  constructor(private db: AngularFireDatabase) {
    // this.basePath = `users/defaultUserId`;
  }

  getList(path: string): Observable<{}[]> {
    return this.db.list(path).valueChanges();
  }

  getData(path: string): Observable<{}> {
    return this.db.object(path).valueChanges();
  }

  setData(path: string, data: any): PromiseLike<Promise<void>> {
    const dataToStore: any = Object.assign(data);
    return this.db
      .list(path)
      .push(dataToStore)
      .then(item => (dataToStore.id = item.key))
      .then(() => this.updateData(path, dataToStore.id, dataToStore));
  }

  updateData(path: string, dataId: string, data: any): Promise<void> {
    return this.db.list(`${path}`).update(dataId, data);
  }

  deleteData(path: string, dataId: string): Promise<void> {
    return this.db.list(path).remove(dataId);
  }
}
