import { Component } from "@angular/core";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-toolbar-user",
  templateUrl: "./toolbar-user.component.html",
  styleUrls: ["./toolbar-user.component.scss"]
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
