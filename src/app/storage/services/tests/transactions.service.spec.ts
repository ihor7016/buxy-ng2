import { TestBed, inject } from "@angular/core/testing";

import { TransactionsService } from "../transactions.service";
import { DatabaseService } from "../database.service";

import { MockDatabaseService } from "./database.service.mock";
import { MockAbstractService } from "./abstract.service.mock";

describe("TransactionsService", () => {
  Object.setPrototypeOf(TransactionsService, MockAbstractService);
  console.dir(Object.getPrototypeOf(TransactionsService));
  let service: TransactionsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionsService,
        { provide: DatabaseService, useClass: MockDatabaseService }
      ]
    });
    service = TestBed.get(TransactionsService);
    console.log(service);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("getDataType", () => {
    it("should return 'transactions'", () => {
      expect(service.getDataType()).toBe("transactions");
    });
  });
});
