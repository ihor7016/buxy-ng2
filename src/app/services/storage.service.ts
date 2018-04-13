import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from "angularfire2/database";

@Injectable()
export class StorageService {
  private basePath: string;
  constructor(private db: AngularFireDatabase) {}

  setUserId(userId: string): void {
    if (!userId) return;
    this.basePath = `users/${userId}`;
  }

  getList(dataType: string): AngularFireList<any> {
    console.log(`${this.basePath}/${dataType}`);
    return this.db.list(`${this.basePath}/${dataType}`);
  }

  getObject(dataType: string, dataId: string): AngularFireObject<any> {
    return this.db.object(`${this.basePath}/${dataType}/${dataId}`);
  }

  setObject(dataType: string, data: any): PromiseLike<Promise<void>> {
    const dataToStore: any = Object.assign(data);
    return this.getList(dataType)
      .push(dataToStore)
      .then(item => {
        dataToStore.id = item.key;
        return this.updateObject(dataType, dataToStore);
      });
  }

  updateObject(dataType: string, data: any): Promise<void> {
    return this.getList(dataType).update(data.id, data);
  }

  deleteObject(dataType: string, dataId: string): Promise<void> {
    return this.getList(dataType).remove(dataId);
  }
}
