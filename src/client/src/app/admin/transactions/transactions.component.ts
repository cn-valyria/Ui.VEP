import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import bulmaCalendar from 'bulma-calendar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AidStatus } from 'src/app/models/enums';
import { Transaction } from 'src/app/models/transaction';
import { VepAdminStore } from 'src/app/store';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  @ViewChild("aidSinceCalendar") aidSinceCalendar: ElementRef<HTMLInputElement> | undefined;
  @ViewChild("aidUntilCalendar") aidUntilCalendar: ElementRef<HTMLInputElement> | undefined;

  currentVisibleTransactions: Transaction[];

  aidStatusNames = AidStatus;
  limitDropdownVisible = false;
  limitOptions = [25, 100, 500, 1000];
  selectedLimit = 0;
  currentPage = 1;
  totalPages = 1;

  constructor(private store$: VepAdminStore) {
    this.currentVisibleTransactions = [];
  }

  ngOnInit(): void {
    this.store$.transactions
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(transactions => {
        this.currentVisibleTransactions = transactions;
      });
    
    this.store$.transactionsSearchCount
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(totalCount => {
        this.totalPages = Math.ceil(totalCount / this.limitOptions[this.selectedLimit]);
      });

    this.searchTransactions();
  }

  ngAfterViewInit(): void {
    const aidSince = bulmaCalendar.attach(this.aidSinceCalendar?.nativeElement)[0];
    aidSince.on("select", e => console.log(e));

    const aidUntil = bulmaCalendar.attach(this.aidUntilCalendar?.nativeElement)[0];
    aidUntil.on("select", e => console.log(e));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  limitDropdownSelectChanged(index: number) {
    this.selectedLimit = index;
    this.searchTransactions();
    this.limitDropdownVisible = false;
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.searchTransactions();
  }

  searchTransactions() {
    this.store$.dispatch("searchTransactions", {
      limit: this.limitOptions[this.selectedLimit],
      offset: this.limitOptions[this.selectedLimit] * (this.currentPage - 1)
    });
  }

}
