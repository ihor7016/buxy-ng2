import { Observable } from "rxjs/Observable";
import { MockDatabaseService } from "./database.service.mock";

export abstract class MockAbstractService<T> {
  constructor(private db: MockDatabaseService) {}

  abstract getDataType(): string;
}
