import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { LayoutComponent } from "./layout.component";
import { AuthService } from "../../auth/auth/auth.service";
import { User } from "@firebase/auth-types";

describe("LayoutComponent", () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let authService;
  let layout: HTMLElement;
  class authMock {
    currentUser = null;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      providers: [{ provide: AuthService, useValue: authMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    layout = fixture.nativeElement;
  });

  it("should not have template content and user defined", () => {
    expect(layout.textContent).toBe("");
    expect(component.user).toBeUndefined();
  });

  it("should hide drawer when the user is null", () => {
    authService.currentUser = null;
    fixture.detectChanges();
    expect(layout.querySelector("app-drawer")).toBeNull();
    expect(component.user).toBeNull();
  });

  it("should show drawer when the user is not null", () => {
    const user = { uid: "id" } as User;
    authService.currentUser = user;
    fixture.detectChanges();
    expect(layout.querySelector("app-drawer")).toBeDefined();
    expect(component.user).toBe(user);
  });
});
