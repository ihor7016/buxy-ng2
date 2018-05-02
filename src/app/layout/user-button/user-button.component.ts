import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-user-button",
  templateUrl: "./user-button.component.html",
  styleUrls: ["./user-button.component.scss"]
})
export class ToolbarUserComponent {
  isOpen = false;
  currentUser: AuthService;

  constructor(private auth: AuthService) {
    this.currentUser = this.auth;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.currentUser.logout();
  }
}
