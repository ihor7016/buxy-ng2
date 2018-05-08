import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";

import { TransactionsComponent } from "../transactions.component";
import { MatDialog } from "@angular/material";
import { TransactionsService } from "../../../storage/services/transactions.service";
import { AccountsService } from "../../../storage/services/accounts.service";
import { TagsService } from "../../../storage/services/tags.service";
import { CurrencyUahService } from "../../../shared/services/currency-uah.service";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  DebugElement
} from "@angular/core";
import { MaterialComponentsModule } from "../../../shared/material/material.module";
import {
  MockTransactionsService,
  MockAccountsService,
  MockTagsService
} from "./storage.service.mock";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import {
  sampleTagList,
  sampleData,
  sampleTransaction,
  sampleAccountList
} from "./samples.mock";
import { MockCurrencyUahService } from "./currency-uah.service.mock";
import { MockMatDialog } from "./mat-dialog.mock";

describe("TransactionComponent", () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;
  let debugElement: DebugElement;
  let nativeElement: HTMLElement;
  let transactionsService: TransactionsService;
  let accountsService: AccountsService;
  let tagsService: TagsService;
  let converter: CurrencyUahService;
  let dialog: MatDialog;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TransactionsComponent],
        imports: [MaterialComponentsModule],
        providers: [
          { provide: MatDialog, useClass: MockMatDialog },
          {
            provide: TransactionsService,
            useClass: MockTransactionsService
          },
          {
            provide: AccountsService,
            useClass: MockAccountsService
          },
          { provide: TagsService, useClass: MockTagsService },
          { provide: CurrencyUahService, useClass: MockCurrencyUahService }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    nativeElement = debugElement.nativeElement;
    transactionsService = TestBed.get(TransactionsService);
    accountsService = TestBed.get(AccountsService);
    tagsService = TestBed.get(TagsService);
    converter = TestBed.get(CurrencyUahService);
    dialog = TestBed.get(MatDialog);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should call getList methods from services", () => {
      makeSpyOnServices();
      component.ngOnInit();
      fixture.detectChanges();
      expect(tagsService.getList).toHaveBeenCalled();
      expect(accountsService.getList).toHaveBeenCalled();
      expect(transactionsService.getList).toHaveBeenCalled();
    });
    it(
      "should create correct data",
      fakeAsync(() => {
        component.ngOnInit();
        tick();
        fixture.detectChanges();
        expect(component.data).toEqual(sampleData);
      })
    );
  });

  describe("handleAddTransactionClick", () => {
    it(
      "should call openTransactionDialog on click event",
      fakeAsync(() => {
        fixture.detectChanges();
        spyOn(component, "openTransactionDialog").and.stub();
        const addButton: HTMLButtonElement = nativeElement.querySelector(
          ".transactions__add-dialog-activation"
        ) as HTMLButtonElement;
        addButton.click();
        tick();
        expect(component.openTransactionDialog).toHaveBeenCalledWith("Add");
      })
    );
  });

  describe("openTransactionDialog", () => {
    it("should open add dialog with correct data", () => {
      fixture.detectChanges();
      spyOn(dialog, "open").and.callThrough();
      spyOn(component, "addTransaction").and.stub();
      spyOn(component, "editTransaction").and.stub();
      component.openTransactionDialog("Add");
      expect(dialog.open).toHaveBeenCalled();
      expect(component.addTransaction).toHaveBeenCalledWith(sampleTransaction);
      expect(component.editTransaction).not.toHaveBeenCalled();
    });
    it("should open edit dialog with correct data", () => {
      fixture.detectChanges();
      spyOn(dialog, "open").and.callThrough();
      spyOn(component, "addTransaction").and.stub();
      spyOn(component, "editTransaction").and.stub();
      component.openTransactionDialog("Edit", sampleTransaction);
      expect(dialog.open).toHaveBeenCalled();
      expect(component.editTransaction).toHaveBeenCalledWith(sampleTransaction);
      expect(component.addTransaction).not.toHaveBeenCalled();
    });
  });

  describe("convertToUah", () => {
    it("should convert and create correct data", () => {
      spyOn(converter, "convert").and.callThrough();
      expect(
        component.convertToUah(sampleTransaction, sampleAccountList).amountUah
      ).toBe(27);
      expect(converter.convert).toHaveBeenCalled();
    });
  });

  function makeSpyOnServices() {
    spyOn(transactionsService, "getList").and.callThrough();
    spyOn(accountsService, "getList").and.callThrough();
    spyOn(tagsService, "getList").and.callThrough();
  }
});
