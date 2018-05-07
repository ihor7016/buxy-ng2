import { TestBed, inject } from "@angular/core/testing";

import { TransactionsService } from "../transactions.service";
import { MockDatabaseService } from "./database.service.mock";
import { DatabaseService } from "../database.service";

describe("TransactionsService", () => {
  let service: TransactionsService;
  let db: DatabaseService;
  const mockDatabaseService = new MockDatabaseService();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionsService,
        { provide: DatabaseService, useValue: mockDatabaseService }
      ]
    });
    service = TestBed.get(TransactionsService);
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
