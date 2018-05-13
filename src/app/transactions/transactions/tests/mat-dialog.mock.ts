import { Observable } from "rxjs/Observable";
import { sampleTransaction } from "./samples.mock";

export class MockMatDialog {
  open() {
    return {
      afterClosed: () => Observable.of(sampleTransaction)
    };
  }
}
