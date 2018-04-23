import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import "rxjs/add/operator/mergeMap";

import { AuthService } from "./auth.service";

@Injectable()
export class DatabaseService {
  private basePath: string;
  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.basePath = `users/${user.uid}`;
      }
    });
  }

  getList(dataType: string): Observable<T[]> {
    return this.db.list<T>(`${this.basePath}/${dataType}`).valueChanges();
  }

  getData(dataType: string, dataId: string): Observable<{}> {
    return this.db
      .object(`${this.basePath}/${dataType}/${dataId}`)
      .valueChanges();
  }

  setData(dataType: string, data: any): Observable<void> {
    const dataToStore = Object.assign(data);
    const ref = this.db.list(`${this.basePath}/${dataType}`).push(dataToStore);
    return fromPromise(ref)
      .map(item => (dataToStore.id = item.key))
      .mergeMap(() => this.updateData(dataType, dataToStore));
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
