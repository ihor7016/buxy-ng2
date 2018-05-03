import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ErrorService {
  errorSource = new Subject<Error>();
  error$ = this.errorSource.asObservable();

  setError(error) {
    this.errorSource.next(error);
  }

  getError() {
    return this.error$;
  }
}
