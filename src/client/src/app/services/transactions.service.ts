import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AidStatus } from '../models/enums';
import { NationSimplified } from '../models/nationSimplified';
import { AidBasedTransaction, TransactionCode } from '../models/aidBasedTransaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private apiUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = "http://localhost:7071/api";
  }

  getTransactions(
    filter: TransactionFilters | undefined = undefined,
    limit: number | undefined = undefined,
    offset: number | undefined = undefined
  ): Promise<TransactionSearchResponse> {
    const params = this.toURLSearchParams(filter, limit, offset);
    return this.http
      .get<TransactionSearchResponse>(`${this.apiUrl}/transactions${params.toString().length > 0 ? "?" + params.toString() : ""}`)
      .toPromise();
  }

  private toURLSearchParams(
    filter: TransactionFilters | undefined,
    limit: number | undefined,
    offset: number | undefined
  ) {
    let params = new URLSearchParams();
    if (filter) {
      if (filter.sentBy) params.append("sentBy", filter.sentBy);
      if (filter.receivedBy) params.append("receivedBy", filter.receivedBy);
      if (filter.sentSince) params.append("sentSince", filter.sentSince.toDateString());
      if (filter.sentUntil) params.append("sentUntil", filter.sentUntil.toDateString());
    }
    if (limit) params.append("limit", limit.toString());
    if (offset) params.append("offset", offset.toString());

    return params;
  }
}

export class TransactionFilters {
  sentBy: string | undefined;
  receivedBy: string | undefined;
  sentSince: Date | undefined;
  sentUntil: Date | undefined;
}

export interface TransactionSearchResponse {
  aidBasedTransactions: TransactionCollection;
  manualTransactions: TransactionCollection;
}

export interface TransactionCollection {
  totalCount: number;
  results: TransactionDetail[];
}

export interface TransactionDetail {
  id: number;
  aidId: number | undefined;
  sentBy: NationSimplified | undefined;
  receivedBy: NationSimplified | undefined;
  status: AidStatus;
  money: number;
  technology: number;
  soldiers: number;
  reason: string;
  startsOn: Date;
  code: TransactionCode | undefined;
  classification: number;
  rate: number;
  cashMovedTechCredit: number;
  cashMovedCashCredit: number;
  techMovedCashCredit: number;
  techMovedTechCredit: number;
}