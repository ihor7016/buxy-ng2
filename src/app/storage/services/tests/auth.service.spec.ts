import { TestBed } from "@angular/core/testing";
import { AuthService } from "../../../auth/auth/auth.service";
import { AngularFireAuth } from "angularfire2/auth";
import { MockAngularFire } from "./angularfire.mock";

describe("AuthService", () => {
  let service: AuthService;
  let fireAuth: AngularFireAuth;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useClass: MockAngularFire }
      ]
    });
    service = TestBed.get(AuthService);
    fireAuth = TestBed.get(AngularFireAuth);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
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
      spyOn(fireAuth.auth, "signOut");
      service.logout();
      expect(fireAuth.auth.signOut).toHaveBeenCalled();
    });
  });
});
