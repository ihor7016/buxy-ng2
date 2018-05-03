import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

import { AuthService } from "../../auth/auth/auth.service";

@Injectable()
export class DatabaseService {
  constructor(private db: AngularFireDatabase, private auth: AuthService) {}

  get path() {
    return `users/${this.auth.currentUser.uid}`;
  }

  getList<T>(dataType: string): Observable<T[]> {
    return this.db.list<T>(`${this.path}/${dataType}`).valueChanges();
  }

  getData<T>(dataType: string, dataId: string): Observable<T> {
    return this.db
      .object<T>(`${this.path}/${dataType}/${dataId}`)
      .valueChanges();
  }

  setData(dataType: string, data: any): Observable<void> {
    const dataToStore = Object.assign({}, data);
    dataToStore.id = this.db.createPushId();
    return fromPromise(
      this.db.list(`${this.path}/${dataType}`).set(dataToStore.id, dataToStore)
    );
  }

  updateData(dataType: string, data: any): Observable<void> {
    return fromPromise(
      this.db.list(`${this.path}/${dataType}`).update(data.id, data)
    ).catch(this.handleError);
  }

  deleteData(dataType: string, dataId: string): Observable<void> {
    return fromPromise(this.db.list(`${this.path}/${dataType}`).remove(dataId));
  }

  handleError(error) {
    return Observable.throw(error);
  }
}
