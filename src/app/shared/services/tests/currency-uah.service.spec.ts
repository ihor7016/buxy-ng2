import { TestBed } from "@angular/core/testing";

import { CurrencyUahService } from "../currency-uah.service";

describe("CurrencyUahService", () => {
  let service: CurrencyUahService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CurrencyUahService] });
    service = TestBed.get(CurrencyUahService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("convert", () => {
    it("should correctly convert $", () => {
      expect(service.convert("$", 10)).toBe(270);
    });
    it("should correctly convert €", () => {
      expect(service.convert("€", 10)).toBe(330);
    });
    it("should not convert ₴", () => {
      expect(service.convert("₴", 10)).toBe(10);
    });
  });
});
