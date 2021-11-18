import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import bulmaCalendar from 'bulma-calendar';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements AfterViewInit {

  @ViewChild("aidSinceCalendar") aidSinceCalendar: ElementRef<HTMLInputElement> | undefined;
  @ViewChild("aidUntilCalendar") aidUntilCalendar: ElementRef<HTMLInputElement> | undefined;

  constructor() { }

  ngAfterViewInit(): void {
    const aidSince = bulmaCalendar.attach(this.aidSinceCalendar?.nativeElement)[0];
    aidSince.on("select", e => console.log(e));

    const aidUntil = bulmaCalendar.attach(this.aidUntilCalendar?.nativeElement)[0];
    aidUntil.on("select", e => console.log(e));
  }

}
