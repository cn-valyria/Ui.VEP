import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Account } from 'src/app/models/account';
import { VepAdminStore } from 'src/app/store';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  private ngUnsubscribe = new Subject();

  accounts: Account[];
  accountBeingEdited: Account | undefined;
  accountEditorIsVisible: boolean = false;

  constructor(private store$: VepAdminStore) {
    this.accounts = [];
  }

  ngOnInit(): void {
    this.store$.accounts
      .pipe(
        filter(accounts => accounts.length != 0),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(accounts => {
        this.accounts = accounts;
      });
    this.store$.dispatch('loadAllAccounts');
  }

  editAccount(accountId: number): void {
    const account = this.accounts.find(acc => acc.nationId === accountId);
    if (account !== undefined) {
      this.accountBeingEdited = Object.assign({}, account);
      this.accountEditorIsVisible = true
    };
  }

  deleteAccount(accountId: number): void {
    this.store$.dispatch('deleteAccount', accountId);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
