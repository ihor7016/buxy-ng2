import { TestBed, inject } from "@angular/core/testing";

import { DatabaseService } from "../database.service";

import { MockDatabaseService } from "./database.service.mock";
import { MockAbstractService } from "./abstract.service.mock";
import { AccountsService } from "../accounts.service";

describe("AccountsService", () => {
  Object.setPrototypeOf(AccountsService, MockAbstractService);
  let service: AccountsService;
  let db: DatabaseService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountsService,
        { provide: DatabaseService, useClass: MockDatabaseService }
      ]
    });
    service = TestBed.get(AccountsService);
    db = TestBed.get(DatabaseService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
    expect(db).toBeDefined();
  });

  describe("getDataType", () => {
    it("should return 'accounts'", () => {
      expect(service.getDataType()).toBe("accounts");
    });
  });
});
