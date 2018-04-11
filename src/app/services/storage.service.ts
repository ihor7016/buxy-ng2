import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "angularfire2/database";

@Injectable()
export class StorageService {
  dbRef: any;
  user: string;
  constructor(private db: AngularFireDatabase) {
    this.dbRef = this.db.list("users");
  }

  setUser(user, data) {
    console.log("set");
    this.user = "user1";
    this.dbRef.push(this.user);
  }

  get() {
    console.log("get");
    return this.dbRef.snapshotChanges();
  }
}
