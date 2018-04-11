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
    const item = {
      accounts: [{ id: "accId1", name: "Cash", currency: "UAH" }],
      tags: ["salary", "rent"],
      transactions: {
        transId1: { desc: "appartments rent", amount: 1500, date: "2018-04-05" }
      }
    };
    this.db.list("users").set(id, item);
  }

  get() {
    console.log("get");
    return this.dbRef.snapshotChanges();
  }
}
