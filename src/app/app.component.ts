import { Component } from "@angular/core";
import { StorageService } from "./services/storage.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title: Observable<any>;
  constructor(private storage: StorageService) {
    this.title = this.storage.get().valueChanges();
  }
}
