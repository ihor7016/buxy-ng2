import { TestBed, inject } from "@angular/core/testing";

import { TransactionsService } from "../transactions.service";
import { DatabaseService } from "../database.service";

import { MockDatabaseService } from "./database.service.mock";
import { MockAbstractService } from "./abstract.service.mock";

describe("TransactionsService", () => {
  Object.setPrototypeOf(TransactionsService, MockAbstractService);
  let service: TransactionsService;
  let db: DatabaseService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionsService,
        { provide: DatabaseService, useClass: MockDatabaseService }
      ]
    });
    service = TestBed.get(TransactionsService);
    db = TestBed.get(DatabaseService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
    expect(db).toBeDefined();
  });

  describe("getDataType", () => {
    it("should return 'transactions'", () => {
      expect(service.getDataType()).toBe("transactions");
    });
  });
});
