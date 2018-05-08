import { TestBed } from "@angular/core/testing";
import { DatabaseService } from "../database.service";
import { AuthService } from "../../../auth/auth/auth.service";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";

class AuthMock {
  currentUser = {
    uid: "id"
  };
}

describe("DatabaseService", () => {
  let sampleList, sampleObject, sampleToStore, sampleToUpdate;
  let service: DatabaseService;
  let dataType: string = "tags";
  let dataId: string = "tagId1";
  const setSpy = jasmine
    .createSpy("set")
    .and.callFake((id: string, data): Promise<void> => Promise.resolve());
  const updateSpy = jasmine
    .createSpy("update")
    .and.callFake((id: string, data): Promise<void> => Promise.resolve());
  const removeSpy = jasmine
    .createSpy("remove")
    .and.callFake((id: string): Promise<void> => Promise.resolve());
  const dbStub = {
    createPushId: jasmine.createSpy("createPushId").and.returnValue("newId"),
    object: jasmine.createSpy("object").and.callFake((path: string) => {
      return {
        valueChanges: (): Observable<any> => Observable.of(sampleObject)
      };
    }),
    list: jasmine.createSpy("list").and.callFake((path: string) => {
      return {
        valueChanges: (): Observable<any> => Observable.of(sampleList),
        set: setSpy,
        update: updateSpy,
        remove: removeSpy
      };
    })
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatabaseService,
        { provide: AngularFireDatabase, useValue: dbStub },
        { provide: AuthService, useClass: AuthMock }
      ]
    });
    service = TestBed.get(DatabaseService);
    sampleList = [
      { id: "tagId1", name: "tagName1" },
      { id: "tagId2", name: "tagName2" }
    ];
    sampleObject = { id: "tagId1", name: "tagName1" };
    sampleToStore = { id: "", name: "tagNameToStore" };
    sampleToUpdate = { id: "tagId1", name: "newName" };
  });

  afterEach(() => {
    service = null;
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("get path", () => {
    it("should return path 'users/id'", () => {
      expect(service.path).toBe("users/id");
    });
  });

  describe("getList", () => {
    it("should return Observable with correct array", () => {
      expect(service.getList(dataType)).toEqual(Observable.of(sampleList));
    });

    it("should call db.list with correct path", () => {
      expect(dbStub.list).toHaveBeenCalledWith(`users/id/${dataType}`);
    });
  });

  describe("getData", () => {
    it("should return Observable with correct object", () => {
      expect(service.getData(dataType, dataId)).toEqual(
        Observable.of(sampleObject)
      );
    });

    it("should call db.object with correct path", () => {
      expect(dbStub.object).toHaveBeenCalledWith(
        `users/id/${dataType}/${dataId}`
      );
    });
  });

  describe("setData", () => {
    it("should return empty Observable", () => {
      expect(service.setData(dataType, sampleToStore)).toEqual(
        fromPromise(Promise.resolve())
      );
    });

    it("should call db.list with correct path", () => {
      expect(dbStub.list).toHaveBeenCalledWith(`users/id/${dataType}`);
    });

    it("should call db.createPushId", () => {
      expect(dbStub.createPushId).toHaveBeenCalledTimes(1);
    });

    it("should call db.list.set with correct id and data", () => {
      sampleToStore.id = "newId";
      expect(setSpy).toHaveBeenCalledWith("newId", sampleToStore);
    });
  });

  describe("updateData", () => {
    it("should return empty Observable", () => {
      expect(service.updateData(dataType, sampleToUpdate)).toEqual(
        fromPromise(Promise.resolve())
      );
    });

    it("should call db.list with correct path", () => {
      expect(dbStub.list).toHaveBeenCalledWith(`users/id/${dataType}`);
    });

    it("should call db.list.update with correct id and data", () => {
      expect(updateSpy).toHaveBeenCalledWith(sampleToUpdate.id, sampleToUpdate);
    });
  });

  describe("deleteData", () => {
    it("should return empty Observable", () => {
      expect(service.deleteData(dataType, "tagId1")).toEqual(
        fromPromise(Promise.resolve())
      );
    });

    it("should call db.list with correct path", () => {
      expect(dbStub.list).toHaveBeenCalledWith(`users/id/${dataType}`);
    });

    it("should call db.list.remove with correct id", () => {
      expect(removeSpy).toHaveBeenCalledWith("tagId1");
    });
  });
});
