import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";

import { AuthService } from "./auth.service";

@Injectable()
export class DatabaseService {
  path: Observable<string>;

  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.path = this.auth.authState.map(user => `users/${user.uid}`);
  }

  getList<T>(dataType: string): Observable<T[]> {
    return this.path.switchMap(path => {
      return this.db.list<T>(`${path}/${dataType}`).valueChanges();
    });
  }

  getData<T>(dataType: string, dataId: string): Observable<T> {
    return this.path.switchMap(path => {
      return this.db.object<T>(`${path}/${dataType}/${dataId}`).valueChanges();
    });
  }

  setData(dataType: string, data: any): Observable<void> {
    const dataToStore = Object.assign(data);
    const ref = this.path.switchMap(path =>
      this.db.list(`${path}/${dataType}`).push(dataToStore)
    );
    return ref
      .map(item => (dataToStore.id = item.key))
      .switchMap(() => this.updateData(dataType, dataToStore));
  }

  updateData(dataType: string, data: any): Observable<void> {
    return this.path.switchMap(path =>
      this.db.list(`${path}/${dataType}`).update(data.id, data)
    );
  }

  deleteData(dataType: string, dataId: string): Observable<void> {
    return this.path.switchMap(path =>
      this.db.list(`${path}/${dataType}`).remove(dataId)
    );
  }
}
