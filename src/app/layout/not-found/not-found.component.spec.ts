import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";

import { MaterialComponentsModule } from "../../shared/material/material.module";
import { NotFoundComponent } from "./not-found.component";

describe("NotFoundComponent", () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let button: HTMLButtonElement;
  let router: Router;
  let mockRouter = {
    navigate: jasmine.createSpy("navigate")
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      imports: [MaterialComponentsModule],
      providers: [{ provide: Router, useValue: mockRouter }]
    });

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    button = fixture.nativeElement.querySelector("button");
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("Button click", () => {
    it("should call navigate method", () => {
      spyOn(component, "navigate");
      button.click();
      fixture.detectChanges();
      expect(component.navigate).toHaveBeenCalled();
    });

    it("should call router.navigate with root path", () => {
      button.click();
      fixture.detectChanges();
      expect(router.navigate).toHaveBeenCalledWith([""]);
    });
  });
});
