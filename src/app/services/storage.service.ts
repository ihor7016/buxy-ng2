import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "angularfire2/database";

@Injectable()
export class StorageService {
  private basePath: string = "/appData";
  items: AngularFireList<any[]> = null;
  item: AngularFireObject<any> = null;
  // dbRef: AngularFireList<any[]>;
  constructor(private db: AngularFireDatabase) {
    // this.dbRef = this.db.list("users");
  }

  getItemsList(query = {}): AngularFireList<any[]> {
    this.items = this.db.list(this.basePath);
    return this.items;
  }

  createItem(item: any): void {
    this.items.push(item);
  }

  setUser(user, data) {
    console.log("set");
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
    // return this.dbRef.snapshotChanges();
  }

  handleError(e) {
    console.log(e);
  }
}
