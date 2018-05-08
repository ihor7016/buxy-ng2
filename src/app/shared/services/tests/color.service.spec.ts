import { TestBed } from "@angular/core/testing";

import { ColorService } from "../color.service";

let service: ColorService;

describe("ColorService", () => {
  beforeAll(() => {
    Math.random = () => 0.5;
    TestBed.configureTestingModule({
      providers: [ColorService]
    });
    service = TestBed.get(ColorService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return rgb color #800000", () => {
    expect(service.get()).toBe("#800000");
  });
});
