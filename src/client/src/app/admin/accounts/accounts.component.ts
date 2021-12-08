import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Account } from 'src/app/models/account';
import { AccountStore } from 'src/app/stores/accountStore';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  accounts: Account[];
  accountBeingEdited: Account | undefined;
  accountEditorIsVisible: boolean = false;

  constructor(private store$: AccountStore) {
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

  createNewAccount(): void {
    this.accountEditorIsVisible = true;
  }

  editAccount(accountId: number): void {
    const account = this.accounts.find(acc => acc.id === accountId);
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
