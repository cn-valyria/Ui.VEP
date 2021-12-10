import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import bulmaCalendar from 'bulma-calendar';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil, tap } from 'rxjs/operators';
import { AdjustmentType, AidStatus, TransactionType } from 'src/app/models/enums';
import { AidBasedTransaction } from 'src/app/models/aidBasedTransaction';
import { TransactionFilters } from 'src/app/services/transactions.service';
import { AccountStore } from 'src/app/stores/accountStore';
import { TransactionStore } from 'src/app/stores/transactionStore';
import { ManualTransaction } from 'src/app/models/manualTransaction';

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

  aidBasedTransactions: AidBasedTransaction[] = [];
  aidBasedTotalCount: number = 0;
  manualTransactions: ManualTransaction[] = [];
  manualTotalCount: number = 0;
  
  get adjustmentTypeNames(): typeof AdjustmentType {
    return AdjustmentType;
  }
  get transactionType(): typeof TransactionType {
    return TransactionType;
  }
  get aidStatusNames(): typeof AidStatus {
    return AidStatus;
  }
  get totalPages(): number {
    const totalDataCount = this.currentTab === TransactionType.AidBased ? this.aidBasedTotalCount : this.manualTotalCount;
    return Math.ceil(totalDataCount / this.limitOptions[this.selectedLimit]);
  }

  limitDropdownVisible = false;
  limitOptions = [25, 100, 500, 1000];
  selectedLimit = 0;
  currentTab: TransactionType = TransactionType.AidBased;
  currentPage = 1;
  filterOptions: TransactionFilters | undefined;

  constructor(private store$: TransactionStore) { }

  ngOnInit(): void {
    this.store$.aidBasedTransactions
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(collection => {
        this.aidBasedTransactions = collection.data ?? [];
        this.aidBasedTotalCount = collection.totalCount ?? 0;
      });

    this.store$.manualTransactions
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(collection => {
        this.manualTransactions = collection.data ?? [];
        this.manualTotalCount = collection.totalCount ?? 0;
      })

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

  switchTab(tab: TransactionType) {
    this.currentTab = tab;
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

  private updateFilters(action: (options: TransactionFilters) => void) {
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

  private searchTransactions() {
    const payload = {
      filter: this.filterOptions,
      limit: this.limitOptions[this.selectedLimit],
      offset: this.limitOptions[this.selectedLimit] * (this.currentPage - 1)
    };

    this.store$.dispatch("getTransactions", payload);
  }

}
