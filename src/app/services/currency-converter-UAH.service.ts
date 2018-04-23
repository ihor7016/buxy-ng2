import { Injectable } from "@angular/core";

@Injectable()
export class CurrencyConverterUAHService {
  convert(curr, amount) {
    if (curr === "USD") {
      return amount * 27;
    }
    if (curr === "EUR") {
      return amount * 33;
    }
    return 0;
  }
}
