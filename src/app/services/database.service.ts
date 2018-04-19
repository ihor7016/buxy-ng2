import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";

@Injectable()
export class DatabaseService {
  private basePath: string;
  constructor(private db: AngularFireDatabase) {
    this.basePath = `users/defaultUserId`;
  }

  getList(dataType: string): Observable<{}[]> {
    return this.db.list(`${this.basePath}/${dataType}`).valueChanges();
  }

  getData(dataType: string, dataId: string): Observable<{}> {
    return this.db
      .object(`${this.basePath}/${dataType}/${dataId}`)
      .valueChanges();
  }

  setData(dataType: string, data: any): Observable<any> {
    const dataToStore: any = Object.assign(data);
    const ref = this.db.list(`${this.basePath}/${dataType}`).push(dataToStore);
    console.log(ref);
    return fromPromise(ref).map(item => console.log(item.key));

    // .then(item => (dataToStore.id = item.key))
    // .then(() => this.updateData(dataType, dataToStore));
  }

  updateData(dataType: string, data: any): Observable<void> {
    return fromPromise(
      this.db.list(`${this.basePath}/${dataType}`).update(data.id, data)
    );
  }

  deleteData(dataType: string, dataId: string): Observable<void> {
    return fromPromise(
      this.db.list(`${this.basePath}/${dataType}`).remove(dataId)
    );
  }
}
