import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { Observable } from "rxjs/Observable";

@Injectable()
export class StorageService {
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  constructor(private db: AngularFireDatabase) {
    this.itemRef = db.object("item");
    this.item = this.itemRef.valueChanges();
  }

  set() {
    console.log("set");
    this.itemRef.set({ name: "new name!" });
  }

  get() {
    console.log("get");
    return this.itemRef;
  }
}
