import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";

import { AuthService } from "./auth.service";

@Injectable()
export class DatabaseService {
  private basePath: string;
  constructor(private db: AngularFireDatabase, private auth: AuthService) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.basePath = `users/${user.uid}`;
      } else {
        this.basePath = `users/defaultUser`;
      }
    });
  }

  getList(dataType: string): Observable<{}[]> {
    return this.db.list(`${this.basePath}/${dataType}`).valueChanges();
  }

  getData(dataType: string, dataId: string): Observable<{}> {
    return this.db
      .object(`${this.basePath}/${dataType}/${dataId}`)
      .valueChanges();
  }

  setData(dataType: string, data: any): Observable<Observable<void>> {
    const dataToStore = Object.assign(data);
    const ref = this.db.list(`${this.basePath}/${dataType}`).push(dataToStore);
    return fromPromise(ref)
      .map(item => (dataToStore.id = item.key))
      .map(() => this.updateData(dataType, dataToStore));
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
