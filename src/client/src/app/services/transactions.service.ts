import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Transaction } from '../models/transaction';

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

  getAidBasedTransactions(
    filter: TransactionFilters | undefined = undefined,
    limit: number | undefined = undefined,
    offset: number | undefined = undefined
  ): Promise<TransactionSearchResponse> {
    const params = this.toURLSearchParams(filter, limit, offset);
    return this.http
      .get<TransactionSearchResponse>(`${this.apiUrl}/transactions/aidBased${params.toString().length > 0 ? "?" + params.toString() : ""}`)
      .toPromise();
  }

  getManualTransactions(
    filter: TransactionFilters | undefined,
    limit: number | undefined,
    offset: number | undefined
  ): Promise<TransactionSearchResponse> {
    const params = this.toURLSearchParams(filter, limit, offset);
    return this.http
      .get<TransactionSearchResponse>(`${this.apiUrl}/transactions/manual${params.toString().length > 0 ? "?" + params.toString() : ""}`)
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

export class TransactionSearchResponse {
  totalCount: number;
  results: Transaction[];

  constructor(totalCount: number = 0, results: Transaction[] = []) {
    this.totalCount = totalCount;
    this.results = results;
  }
}