import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Account } from "../models/account";
import { Transaction } from "../models/transaction";
import { AccountService } from "../services/account.service";
import { TransactionFilters, TransactionsService } from "../services/transactions.service";

interface Store {
    accounts: BehaviorSubject<Account[]>,
    transactions: BehaviorSubject<Transaction[]>
}

interface ActionSet {
    loadAllAccounts: (payload: any) => void;
    createAccount: (payload: any) => void;
    updateAccount: (payload: any) => void;
    deleteAccount: (payload: any) => void;
    searchTransactions: (payload: any) => void;
}

@Injectable({
    providedIn: 'root'
})
export class VepAdminStore {
    
    // Internal properties
    private _accounts: Account[] = [];
    private _transactions: Transaction[] = [];
    private store: Store;
    private actions: ActionSet;
    
    // Constructor
    constructor(
        private accountService: AccountService,
        private transactionsService: TransactionsService
    ) {
        this.store = {
            accounts: new BehaviorSubject<Account[]>([]),
            transactions: new BehaviorSubject<Transaction[]>([])
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
        return this.store.transactions.asObservable();
    }

    // Action dispatcher
    dispatch(action: string, payload: any = undefined): void {
        const executable = this.actions[action as keyof ActionSet];
        executable(payload);
    }

    // Internal action implementations
    private loadAllAccounts(): void {
        this.accountService.getAllAccounts().then(data => {
            this._accounts = [...data];
            this.store.accounts.next([...this._accounts]);
        });
    }

    private createAccount(nationId: number): void {
        this.accountService.createAccount(nationId).then(createdAccount => {
            this._accounts.push(createdAccount);
            this.store.accounts.next([...this._accounts]);
        })
    }

    private updateAccount(account: Account): void {
        this.accountService.updateAccount(account).then(() => {
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
        });
    }

    private deleteAccount(accountId: number): void {
        this.accountService.deleteAccount(accountId).then(() => {
            const i = this._accounts.findIndex(a => a.id === accountId);
            const accounts = [...this._accounts];
            accounts.splice(i, 1);
            this._accounts = accounts;
            this.store.accounts.next(this._accounts);
        });
    }

    private searchTransactions(
        filter: TransactionFilters | undefined = undefined,
        limit: number | undefined = undefined,
        offset: number | undefined = undefined
    ): void {
        this.transactionsService.searchTransactions(filter, limit, offset).then(data => {
            this._transactions = [...data];
            this.store.transactions.next([...this._transactions]);
        });
    }
}