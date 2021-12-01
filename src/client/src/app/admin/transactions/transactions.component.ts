import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import bulmaCalendar from 'bulma-calendar';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil, tap } from 'rxjs/operators';
import { AidStatus } from 'src/app/models/enums';
import { Transaction } from 'src/app/models/transaction';
import { TransactionFilters } from 'src/app/services/transactions.service';
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
  @ViewChild("sentBy") sentBy: ElementRef<HTMLInputElement> | undefined;
  @ViewChild("receivedBy") receivedBy: ElementRef<HTMLInputElement> | undefined;

  currentVisibleTransactions: Transaction[];

  aidStatusNames = AidStatus;
  limitDropdownVisible = false;
  limitOptions = [25, 100, 500, 1000];
  selectedLimit = 0;
  currentPage = 1;
  totalPages = 1;
  filterOptions: TransactionFilters | undefined;

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
    if (this.sentBy) {
      fromEvent(this.sentBy.nativeElement, "keyup").pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(text => {
        const value = this.sentBy?.nativeElement.value;
        console.log(text, value);
        if (value) {
          this.updateFilters(options => options.sentBy = value);
        } else {
          this.updateFilters(options => options.sentBy = undefined);
        }
        this.searchTransactions();
      });
    }

    if (this.receivedBy) {
      fromEvent(this.receivedBy.nativeElement, "keyup").pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(text => {
        const value = this.receivedBy?.nativeElement.value;
        console.log(text, value);
        if (value) {
          this.updateFilters(options => options.receivedBy = value);
        } else {
          this.updateFilters(options => options.receivedBy = undefined);
        }
        this.searchTransactions();
      });
    }

    if (this.aidSinceCalendar) {
      const aidSince = bulmaCalendar.attach(this.aidSinceCalendar.nativeElement)[0];
      aidSince.on("select", e => {
        const sentSince = new Date(e.data.value().toString());
        console.log(e, sentSince);
        this.updateFilters(options => options.sentSince = sentSince);
        this.searchTransactions();
      });
      aidSince.on("hide", e => {
        if (!e.data.value()) {
          this.updateFilters(options => options.sentSince = undefined);
          this.searchTransactions();
        }
      });
    }

    const aidUntil = bulmaCalendar.attach(this.aidUntilCalendar?.nativeElement)[0];
    aidUntil.on("select", e => {
      const sentUntil = new Date(e.data.value().toString());
      console.log(e, sentUntil);
      this.updateFilters(options => options.sentUntil = sentUntil);
      this.searchTransactions();
    });
    aidUntil.on("hide", e => {
      if (!e.data.value()) {
        this.updateFilters(options => options.sentUntil = undefined);
        this.searchTransactions();
      }
    });
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

  updateFilters(action: (options: TransactionFilters) => void) {
    // Sanity check that the filters aren't undefined when we use this method
    if (this.filterOptions === undefined) this.filterOptions = new TransactionFilters();

    // Execute the action against the stored options
    action(this.filterOptions);

    // If all filter options are undefined after the above action, then set the whole filter to undefined so it doesn't mess with the query params
    if (
      this.filterOptions.sentBy === undefined
      && this.filterOptions.receivedBy === undefined
      && this.filterOptions.sentSince === undefined
      && this.filterOptions.sentUntil === undefined
    ) {
      this.filterOptions = undefined;
    }
  }

  searchTransactions() {
    this.store$.dispatch("searchTransactions", {
      filter: this.filterOptions,
      limit: this.limitOptions[this.selectedLimit],
      offset: this.limitOptions[this.selectedLimit] * (this.currentPage - 1)
    });
  }

}
