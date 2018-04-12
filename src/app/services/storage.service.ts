import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "angularfire2/database";

@Injectable()
export class StorageService {
  private basePath: string;
  constructor(private db: AngularFireDatabase) {
    /// remove
    this.basePath = `users/-L9pBogXuQosr-X5rcV5`;
  }

  setUserId(userId: string) {
    if (!userId) return;
    this.basePath = `users/${userId}`;
  }

  getList(dataType: string): AngularFireList<any> {
    return this.db.list(`${this.basePath}/${dataType}`);
  }

  getObject(dataType: string, dataId: string): AngularFireObject<any> {
    return this.db.object(`${this.basePath}/${dataType}/${dataId}`);
  }

  setObject(dataType: string, data: any) {
    // generates Id
    this.getList(dataType).push(data);
    // need to return id
  }

  // createItem(item: any): void {
  //   this.items.push(item);
  // }

  // setUser(user, data) {
  //   console.log("set");
  //   const id = this.db.createPushId();
  //   const item = {
  //     accounts: [{ id: "accId1", name: "Cash", currency: "UAH" }],
  //     tags: ["salary", "rent"],
  //     transactions: {
  //       transId1: { desc: "appartments rent", amount: 1500, date: "2018-04-05" }
  //     }
  //   };
  //   this.db.list("users").set(id, item);
  // }

  // get() {
  //   console.log("get");
  //   // return this.dbRef.snapshotChanges();
  // }

  // handleError(e) {
  //   console.log(e);
  // }
}
