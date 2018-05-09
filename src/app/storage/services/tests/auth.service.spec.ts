import { TestBed } from "@angular/core/testing";
import { AuthService } from "../../../auth/auth/auth.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { MockAngularFire } from "./angularfire.mock";
import { MockRouter } from "./router.mock";
import any = jasmine.any;

describe("AuthService", () => {
  let service: AuthService;
  let fireAuth: AngularFireAuth;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useClass: MockRouter },
        { provide: AngularFireAuth, useClass: MockAngularFire }
      ]
    });
    service = TestBed.get(AuthService);
    router = TestBed.get(Router);
    fireAuth = TestBed.get(AngularFireAuth);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
    expect(router).toBeDefined();
    expect(fireAuth).toBeDefined();
  });

  describe("signInRegular", () => {
    it("should return user with given creds", () => {
      let email = "abc@abc.abc";
      let password = "1234";
      service.signInRegular(email, password);
      expect(service.currentUser.email).toBe(email);
    });
  });

  describe("signUpRegular", () => {
    it("should return user with given creds", () => {
      let email = "abc@abc.abc";
      let password = "1234";
      service.emailSignUp(email, password);
      expect(service.currentUser.email).toBe(email);
    });
  });

  describe("signInWithGoogle", () => {
    it("sign in with popup should be called", () => {
      spyOn(fireAuth.auth, "signInWithPopup");
      service.signInWithGoogle();
      expect(fireAuth.auth.signInWithPopup).toHaveBeenCalled();
    });
  });

  describe("signOut", () => {
    it("router navigate should be called", () => {
      spyOn(router, "navigate");
      service.logout();

      expect(router.navigate).toHaveBeenCalledWith(["/"]);
    });
  });
});
