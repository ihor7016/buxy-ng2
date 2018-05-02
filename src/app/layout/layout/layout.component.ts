import { Component } from "@angular/core";
import { AuthService } from "../../auth/auth/auth.service";

@Component({
  selector: "app-layout",
  template: `<app-drawer *ngIf="user"></app-drawer>`
})
export class LayoutComponent {
  constructor(private auth: AuthService) {}

  get user() {
    return this.auth.currentUser;
  }
}
