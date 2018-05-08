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
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { MaterialComponentsModule } from "../../../shared/material/material.module";
import {
  MockTransactionsService,
  MockAccountsService,
  MockTagsService,
  sampleAccountList,
  sampleTagList,
  sampleTransactionList
} from "./storage.service.mock";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

describe("TransactionComponent", () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;
  let transactionsService: TransactionsService;
  let accountsService: AccountsService;
  let tagsService: TagsService;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TransactionsComponent],
        imports: [MaterialComponentsModule],
        providers: [
          MatDialog,
          {
            provide: TransactionsService,
            useClass: MockTransactionsService
          },
          {
            provide: AccountsService,
            useClass: MockAccountsService
          },
          { provide: TagsService, useClass: MockTagsService },
          CurrencyUahService
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      TestBed.overrideComponent(TransactionsComponent, {
        set: {
          providers: []
        }
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    transactionsService = TestBed.get(TransactionsService);
    accountsService = TestBed.get(AccountsService);
    tagsService = TestBed.get(TagsService);
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
      "should call convert to Uah method",
      fakeAsync(() => {
        spyOn(component, "convertToUah").and.stub();
        component.ngOnInit();
        tick();
        fixture.detectChanges();
        expect(component.convertToUah).toHaveBeenCalled();
      })
    );
  });

  function makeSpyOnServices() {
    spyOn(transactionsService, "getList").and.callThrough();
    spyOn(accountsService, "getList").and.callThrough();
    spyOn(tagsService, "getList").and.callThrough();
  }
});
