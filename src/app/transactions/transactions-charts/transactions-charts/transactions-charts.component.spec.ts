import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TransactionsChartsComponent } from "./transactions-charts.component";

describe("TransactionsChartsComponent", () => {
  let component: TransactionsChartsComponent;
  let fixture: ComponentFixture<TransactionsChartsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TransactionsChartsComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
