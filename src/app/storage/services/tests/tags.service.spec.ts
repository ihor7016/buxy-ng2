import { TestBed, inject } from "@angular/core/testing";

import { DatabaseService } from "../database.service";

import { MockDatabaseService } from "./database.service.mock";
import { MockAbstractService } from "./abstract.service.mock";
import { TagsService } from "../tags.service";

describe("TagService", () => {
  Object.setPrototypeOf(TagsService, MockAbstractService);
  let service: TagsService;
  let db: DatabaseService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TagsService,
        { provide: DatabaseService, useClass: MockDatabaseService }
      ]
    });
    service = TestBed.get(TagsService);
    db = TestBed.get(DatabaseService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
    expect(db).toBeDefined();
  });

  describe("getDataType", () => {
    it("should return 'tags'", () => {
      expect(service.getDataType()).toBe("tags");
    });
  });
});
