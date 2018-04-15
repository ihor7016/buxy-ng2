import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "angularfire2/database";
import { Observable } from "rxjs/Observable";

@Injectable()
export class StorageService {
  private basePath: string;
  constructor(private db: AngularFireDatabase) {}

  setUserId(userId: string): void {
    if (!userId) return;
    this.basePath = `users/${userId}`;
  }

  getList(dataType: string): Observable<{}[]> {
    return this.db.list(`${this.basePath}/${dataType}`).valueChanges();
  }

  getData(dataType: string, dataId: string): Observable<{}> {
    return this.db
      .object(`${this.basePath}/${dataType}/${dataId}`)
      .valueChanges();
  }

  setData(dataType: string, data: any): PromiseLike<Promise<void>> {
    const dataToStore: any = Object.assign(data);
    return this.db
      .list(`${this.basePath}/${dataType}`)
      .push(dataToStore)
      .then(item => (dataToStore.id = item.key))
      .then(() => this.updateData(dataType, dataToStore));
  }

  updateData(dataType: string, data: any): Promise<void> {
    return this.db.list(`${this.basePath}/${dataType}`).update(data.id, data);
  }

  deleteData(dataType: string, dataId: string): Promise<void> {
    return this.db.list(`${this.basePath}/${dataType}`).remove(dataId);
  }
}
