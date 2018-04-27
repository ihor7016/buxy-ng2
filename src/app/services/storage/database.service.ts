import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import "rxjs/add/operator/switchMap";

import { AuthService } from "../auth.service";

@Injectable()
export class DatabaseService {
  path: Observable<string>;
  basePath: string;

  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.path = this.auth.authState.map(
      user => (this.basePath = `users/${user.uid}`)
    );
  }

  getList<T>(dataType: string): Observable<T[]> {
    if (!this.basePath) {
      return this.path.switchMap(path =>
        this.db.list<T>(`${path}/${dataType}`).valueChanges()
      );
    }
    return this.db.list<T>(`${this.basePath}/${dataType}`).valueChanges();
  }

  getData<T>(dataType: string, dataId: string): Observable<T> {
    if (!this.basePath) {
      return this.path.switchMap(path => {
        return this.db
          .object<T>(`${path}/${dataType}/${dataId}`)
          .valueChanges();
      });
    }
    return this.db
      .object<T>(`${this.basePath}/${dataType}/${dataId}`)
      .valueChanges();
  }

  setData(dataType: string, data: any): Observable<void> {
    const dataToStore = Object.assign({}, data);
    const id = this.db.createPushId();
    dataToStore.id = id;
    if (!this.basePath) {
      return this.path.switchMap(path =>
        this.db.list(`${path}/${dataType}`).set(id, dataToStore)
      );
    }
    return fromPromise(
      this.db.list(`${this.basePath}/${dataType}`).set(id, dataToStore)
    );
  }

  updateData(dataType: string, data: any): Observable<void> {
    if (!this.basePath) {
      return this.path.switchMap(path =>
        this.db.list(`${path}/${dataType}`).update(data.id, data)
      );
    }
    return fromPromise(
      this.db.list(`${this.basePath}/${dataType}`).update(data.id, data)
    );
  }

  deleteData(dataType: string, dataId: string): Observable<void> {
    if (!this.basePath) {
      return this.path.switchMap(path =>
        this.db.list(`${path}/${dataType}`).remove(dataId)
      );
    }
    return fromPromise(
      this.db.list(`${this.basePath}/${dataType}`).remove(dataId)
    );
  }
}
