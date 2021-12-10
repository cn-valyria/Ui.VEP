import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AidBasedTransaction } from "../models/aidBasedTransaction";
import { AdjustmentType } from "../models/enums";
import { ManualTransaction } from "../models/manualTransaction";
import { TransactionDetail, TransactionFilters, TransactionSearchResponse, TransactionsService } from "../services/transactions.service";
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
    private aidBasedState: State<AidBasedTransaction>;
    private manualState: State<ManualTransaction>;

    constructor(private transactionsService: TransactionsService) {
        super({
            getTransactions: (payload: TransactionSearchRequest) => this.getTransactions(payload.filter, payload.limit, payload.offset),
        });

        this.aidBasedState = {
            transactions: new BehaviorSubject<Collection<AidBasedTransaction>>({ totalCount: undefined, data: undefined })
        };
        this.manualState = {
            transactions: new BehaviorSubject<Collection<ManualTransaction>>({ totalCount: undefined, data: undefined })
        };
    }

    get aidBasedTransactions(): Observable<Collection<AidBasedTransaction>> {
        return this.aidBasedState.transactions.asObservable();
    }

    get manualTransactions(): Observable<Collection<ManualTransaction>> {
        return this.manualState.transactions.asObservable();
    }

    private async getTransactions(
        filter: TransactionFilters | undefined,
        limit: number | undefined,
        offset: number | undefined
    ) {
        const data = await this.transactionsService.getTransactions(filter, limit, offset);
        const aidBasedData = data.aidBasedTransactions.results.map(txn => this.mapToAidBasedTransaction(txn));
        const manualData = data.manualTransactions.results.map(txn => this.mapToManualTransaction(txn));

        this.aidBasedState.transactions.next({ totalCount: data.aidBasedTransactions.totalCount, data: aidBasedData });
        this.manualState.transactions.next({ totalCount: data.manualTransactions.totalCount, data: manualData });
    }

    private mapToAidBasedTransaction(txn: TransactionDetail): AidBasedTransaction {
        return new AidBasedTransaction(
            txn.id,
            txn.aidId ?? this.throwExpression("Cannot map to an aid-based transaction if aid ID is null"),
            txn.sentBy,
            txn.receivedBy,
            txn.status,
            txn.money,
            txn.technology,
            txn.soldiers,
            txn.reason,
            txn.startsOn,
            txn.code,
            txn.classification,
            txn.rate,
            txn.cashMovedTechCredit,
            txn.cashMovedCashCredit,
            txn.techMovedCashCredit,
            txn.techMovedTechCredit
        );
    }

    private mapToManualTransaction(txn: TransactionDetail): ManualTransaction {
        return new ManualTransaction(
            txn.id,
            txn.sentBy !== undefined ? txn.sentBy : txn.receivedBy,
            txn.sentBy !== undefined ? AdjustmentType.Credit : AdjustmentType.Debt,
            txn.reason,
            (txn.code?.sendingRole ?? "") + (txn.code?.receivingRole ?? ""),
            txn.classification,
            txn.rate,
            txn.cashMovedTechCredit,
            txn.cashMovedCashCredit,
            txn.techMovedCashCredit,
            txn.techMovedTechCredit
        );
    }

    private throwExpression(errorMessage: string): never {
        throw new Error(errorMessage);
    }
}