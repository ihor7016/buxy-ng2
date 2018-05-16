import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OverlayContainer } from "@angular/cdk/overlay";

import { TransactionDialogComponent } from "../transaction-dialog.component";
import {
  NoopComponent,
  DialogTestModule,
  sampleEmptyGroup,
  sampleTransaction,
  sampleGroup
} from "./samples.mock";

describe("TransactionDialogComponent", () => {
  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;
  let noop: ComponentFixture<NoopComponent>;
  let component: TransactionDialogComponent;
  let fixture: ComponentFixture<TransactionDialogComponent>;
  let mockDialogRef = {};
  let mockDialogData = {
    action: "Add",
    accounts: [],
    tags: []
  };

  describe("instance", () => {
    beforeEach(
      async(() => {
        TestBed.configureTestingModule({
          imports: [DialogTestModule],
          providers: [
            { provide: MatDialogRef, useValue: mockDialogRef },
            { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
          ]
        }).compileComponents();

        fixture = TestBed.createComponent(TransactionDialogComponent);
        component = fixture.componentInstance;
        jasmine.clock().mockDate(new Date("2018-05-05"));
      })
    );

    it("should create", () => {
      expect(component).toBeTruthy();
    });

    describe("ngOnInit", () => {
      it("should fill form", () => {
        spyOn(component, "createData").and.callThrough();
        fixture.detectChanges();
        expect(component.createData).toHaveBeenCalled();
        expect(component.form.value).toEqual(sampleEmptyGroup);
      });

      it(
        "should markAsTouched amount value after touching it",
        fakeAsync(() => {
          fixture.detectChanges();
          const amount: HTMLInputElement = fixture.debugElement.query(
            By.css("input[formControlName=amount]")
          ).nativeElement;
          amount.dispatchEvent(new Event("input"));
          fixture.detectChanges();
          tick();
          expect(component.form.controls.amount.touched).toBeTruthy();
        })
      );
    });

    describe("createData", () => {
      it("should create formGroup data with dataToEdit", () => {
        component.data.dataToEdit = sampleTransaction;
        expect(component.createData()).toEqual(sampleGroup);
      });
    });
  });

  describe("opened dialog", () => {
    const config = {
      data: mockDialogData
    };
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DialogTestModule],
        providers: [
          {
            provide: OverlayContainer,
            useFactory: () => {
              overlayContainerElement = document.createElement("div");
              return { getContainerElement: () => overlayContainerElement };
            }
          }
        ]
      }).compileComponents();
      dialog = TestBed.get(MatDialog);
      noop = TestBed.createComponent(NoopComponent);
    });

    it("should have correct header", () => {
      dialog.open(TransactionDialogComponent, config);
      noop.detectChanges();
      const header = overlayContainerElement.querySelector("h1");
      expect(header.textContent).toBe("Add transaction");
    });
  });
});
