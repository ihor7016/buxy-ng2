import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth/auth.service";

@Component({
  selector: "app-user-button",
  templateUrl: "./user-button.component.html",
  styleUrls: ["./user-button.component.scss"]
})
export class ToolbarUserComponent {
  isOpen = false;
  currentUser: AuthService;

  constructor(private auth: AuthService, private router: Router) {
    this.currentUser = this.auth;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.currentUser.logout().then(() => {
      this.router.navigate(["/"]);
    });
  }
}
