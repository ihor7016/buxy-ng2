import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";

import { AuthService } from "./auth.service";

@Injectable()
export class DatabaseService {
  constructor(private db: AngularFireDatabase, private auth: AuthService) {}

  private getPath() {
    return this.auth.authState.map(user => `users/${user.uid}`);
  }

  getList(dataType: string): Observable<{}[]> {
    return this.getPath().mergeMap(path =>
      this.db.list(`${path}/${dataType}`).valueChanges()
    );
  }

  getData(dataType: string, dataId: string): Observable<{}> {
    return this.getPath().mergeMap(path =>
      this.db.object(`${path}/${dataType}/${dataId}`).valueChanges()
    );
  }

  setData(dataType: string, data: any): Observable<void> {
    const dataToStore = Object.assign(data);
    const ref = this.getPath().mergeMap(path =>
      this.db.list(`${path}/${dataType}`).push(dataToStore)
    );
    return ref
      .map(item => (dataToStore.id = item.key))
      .mergeMap(() => this.updateData(dataType, dataToStore));
  }

  updateData(dataType: string, data: any): Observable<void> {
    return this.getPath().mergeMap(path =>
      this.db.list(`${path}/${dataType}`).update(data.id, data)
    );
  }

  deleteData(dataType: string, dataId: string): Observable<void> {
    return this.getPath().mergeMap(path =>
      this.db.list(`${path}/${dataType}`).remove(dataId)
    );
  }
}
