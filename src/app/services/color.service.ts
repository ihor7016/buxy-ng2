import { Injectable } from "@angular/core";

@Injectable()
export class ColorService {
  get(): string {
    return "#" + (Math.random().toString(16) + "0000000").slice(2, 8);
  }
}
