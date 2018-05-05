import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MaterialComponentsModule } from "../../shared/material/material.module";

import { AuthService } from "../../auth/auth/auth.service";

import { LayoutComponent } from "./layout.component";
import { DrawerComponent } from "../drawer/drawer.component";

describe("LayoutComponent", () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let authSpy = jasmine.createSpyObj("AuthService", ["currentUser"]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent, DrawerComponent],
      imports: [MaterialComponentsModule],
      providers: [{ provide: AuthService, useValue: authSpy }]
    }).compileComponents();
    authSpy = TestBed.get(AuthService);
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  xit("should load darwer when user is truthy", () => {
    authSpy.currentUser.and.returnValue(true);
    expect(component).toBeTruthy();
  });
});
