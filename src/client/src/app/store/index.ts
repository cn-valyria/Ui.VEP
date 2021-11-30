import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Account } from "../models/account";
import { Transaction } from "../models/transaction";
import { AccountService } from "../services/account.service";
import { TransactionFilters, TransactionsService } from "../services/transactions.service";

interface Store {
    accounts: BehaviorSubject<Account[]>,
    transactions: {
        totalCount: BehaviorSubject<number>,
        results: BehaviorSubject<Transaction[]>
    },
}

@Injectable({
    providedIn: 'root'
})
export class VepAdminStore {
    
    // Internal properties
    private _accounts: Account[] = [];
    private _transactions: Transaction[] = [];
    private store: Store;
    private actions: { [actionName: string]: (payload: any) => Promise<any>; };
    
    // Constructor
    constructor(
        private accountService: AccountService,
        private transactionsService: TransactionsService
    ) {
        this.store = {
            accounts: new BehaviorSubject<Account[]>([]),
            transactions: {
                totalCount: new BehaviorSubject<number>(0),
                results: new BehaviorSubject<Transaction[]>([])
            }
        };

        this.actions = {
            loadAllAccounts: () => this.loadAllAccounts(),
            createAccount: (nationId: number) => this.createAccount(nationId),
            updateAccount: (account: Account) => this.updateAccount(account),
            deleteAccount: (accountId: number) => this.deleteAccount(accountId),
            searchTransactions: (payload: {
                filter: TransactionFilters | undefined,
                limit: number | undefined,
                offset: number | undefined
            }) => this.searchTransactions(payload.filter, payload.limit, payload.offset)
        }
    }

    // Getters
    get accounts(): Observable<Account[]> {
        return this.store.accounts.asObservable();
    }

    get transactions(): Observable<Transaction[]> {
        return this.store.transactions.results.asObservable();
    }

    get transactionsSearchCount(): Observable<number> {
        return this.store.transactions.totalCount.asObservable();
    }

    // Action dispatcher
    dispatch(action: string, payload: any = undefined): Promise<any> {
        const executable = this.actions[action] as (payload: any) => Promise<any>;
        return executable(payload);
    }

    // Internal action implementations
    private async loadAllAccounts() {
        const data = await this.accountService.getAllAccounts();
        this._accounts = [...data];
        this.store.accounts.next([...this._accounts]);
    }

    private async createAccount(nationId: number) {
        const createdAccount = await this.accountService.createAccount(nationId);
        this._accounts.push(createdAccount);
        this.store.accounts.next([...this._accounts]);
    }

    private async updateAccount(account: Account) {
        await this.accountService.updateAccount(account);
        const i = this._accounts.findIndex(a => a.id === account.id);
        const updatedAccount = {
            ...this._accounts[i],
            role: account.role,
            uniqueCode: account.uniqueCode,
            discord: account.discord,
            discordUniqueId: account.discordUniqueId,
            hasForeignMinistry: account.hasForeignMinistry,
            hasFederalAidCommission: account.hasFederalAidCommission,
            hasDisasterReliefAgency: account.hasDisasterReliefAgency
        };

        this._accounts = [...this._accounts.splice(0, i), updatedAccount, ...this._accounts.splice(i + 1)];
        this.store.accounts.next(this._accounts);
    }

    private async deleteAccount(accountId: number) {
        await this.accountService.deleteAccount(accountId);
        const i = this._accounts.findIndex(a => a.id === accountId);
        const accounts = [...this._accounts];
        accounts.splice(i, 1);
        this._accounts = accounts;
        this.store.accounts.next(this._accounts);
    }

    private async searchTransactions(
        filter: TransactionFilters | undefined = undefined,
        limit: number | undefined = undefined,
        offset: number | undefined = undefined
    ) {
        const data = await this.transactionsService.searchTransactions(filter, limit, offset);
        this.store.transactions.totalCount.next(data.totalCount);
        this._transactions = [...data.results];
        this.store.transactions.results.next([...this._transactions]);
    }
}