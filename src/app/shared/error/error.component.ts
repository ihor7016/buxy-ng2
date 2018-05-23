import { Component, OnInit } from "@angular/core";
import { ErrorService } from "./error.service";
import "rxjs/add/operator/filter";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.scss"]
})
export class ErrorComponent implements OnInit {
  message: string;
  constructor(private errorService: ErrorService) {}

  ngOnInit() {
    this.errorService.getError().subscribe(err => (this.message = err.message));
  }
}
