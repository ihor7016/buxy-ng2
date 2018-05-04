import { TestBed } from "@angular/core/testing";
import { DatabaseService } from "../database.service";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../../../auth/auth/auth.service";
import { AngularFireDatabase } from "angularfire2/database";

class AuthMock {
  currentUser = {
    uid: "id"
  };
}

let samleToStore = { id: "", name: "tagNameToStore" };
let sampleToUpdate = { id: "tagId1", name: "newName" };

describe("DatabaseService", () => {
  let sampleList, sampleObject;
  let service: DatabaseService;
  let dataType: string = "tags";
  let objectSpy: any = jasmine
    .createSpy("object")
    .and.callFake((path: string) => {
      return { valueChanges: () => Observable.of(sampleObject) };
    });
  let listSpy: any = jasmine.createSpy("list").and.callFake((path: string) => {
    return { valueChanges: () => Observable.of(sampleList) };
  });
  let createPushIdSpy: any = jasmine
    .createSpy("createPushId")
    .and.returnValue("newId");
  let dbStub: any = {
    object: objectSpy,
    list: listSpy,
    createPushId: createPushIdSpy
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
  });

  afterEach(() => {
    service = null;
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
