import { async, ComponentFixture, TestBed } from "@angular/core/testing";

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
  MockTagsService
} from "./storage.service.mock";

describe("TransactionComponent", () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TransactionsComponent],
        imports: [MaterialComponentsModule],
        providers: [
          MatDialog,
          { provide: TransactionsService, useClass: MockTransactionsService },
          { provide: AccountsService, useClass: MockAccountsService },
          { provide: TagsService, useClass: MockTagsService },
          CurrencyUahService
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  xdescribe("ngOnInit", () => {
    it("should retrieve data from services", () => {});
  });
});
