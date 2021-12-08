import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Transaction } from "../models/transaction";
import { TransactionFilters, TransactionSearchResponse, TransactionsService } from "../services/transactions.service";
import { Collection } from "./collection";
import { State } from "./state";
import { StoreBase } from "./storeBase";

interface TransactionSearchRequest {
    filter: TransactionFilters | undefined;
    limit: number | undefined;
    offset: number | undefined;
}

@Injectable({
    providedIn: 'root'
})
export class TransactionStore extends StoreBase {
    
    // Internal properties
    private state: State<Transaction>;

    constructor(private transactionsService: TransactionsService) {
        super({
            getAidBasedTransactions: (payload: TransactionSearchRequest) => this.getAidBasedTransactions(payload.filter, payload.limit, payload.offset),
            getManualTransactions: (payload: TransactionSearchRequest) => this.getManualTransactions(payload.filter, payload.limit, payload.offset)
        });

        this.state = {
            aidBasedTransactions: new BehaviorSubject<Collection<Transaction>>({ totalCount: undefined, data: undefined }),
            manualTransactions: new BehaviorSubject<Collection<Transaction>>({ totalCount: undefined, data: undefined })
        };
    }

    get aidBasedTransactions(): Observable<Collection<Transaction>> {
        return this.state.aidBasedTransactions.asObservable();
    }

    get manualTransactions(): Observable<Collection<Transaction>> {
        return this.state.manualTransactions.asObservable();
    }

    private async getAidBasedTransactions(
        filter: TransactionFilters | undefined,
        limit: number | undefined,
        offset: number | undefined
    ) {
        const data = await this.transactionsService.getAidBasedTransactions(filter, limit, offset);
        this.state.aidBasedTransactions.next(this.toCollection(data));
    }

    private async getManualTransactions(
        filter: TransactionFilters | undefined,
        limit: number | undefined,
        offset: number | undefined
    ) {
        const data = await this.transactionsService.getManualTransactions(filter, limit, offset);
        this.state.manualTransactions.next(this.toCollection(data));
    }

    private toCollection(searchResponse: TransactionSearchResponse): Collection<Transaction> {
        return {
            totalCount: searchResponse.totalCount,
            data: searchResponse.results
        }
    }
}