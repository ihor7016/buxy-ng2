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
    const id = this.db.createPushId();
    const item = { id: id };
    this.db.list("users").set(item.id, item);
    this.db.list(item.id).push("accounts");
  }

  get() {
    console.log("get");
    return this.dbRef.snapshotChanges();
  }
}
