import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  accounts: Array;

  constructor() {
  }

  ngOnInit() {
    this.accounts = Array(5).fill(0).map((_, i) => `Account ${i + 1}`);
  }
}
