import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Account } from "../models/account";
import { AccountService } from "../services/account.service";

@Injectable({
    providedIn: 'root'
})
export class VepAdminStore {
    
    // Internal properties
    private _accounts: Account[] = [];
    private store: Store;
    private actions: ActionSet;
    
    // Constructor
    constructor(
        private accountService: AccountService
    ) {
        this.store = {
            accounts: new BehaviorSubject<Account[]>([])
        };

        this.actions = {
            loadAllAccounts: () => this.loadAllAccounts(),
            updateAccount: (account: Account) => this.updateAccount(account),
            deleteAccount: (accountId: number) => this.deleteAccount(accountId)
        }
    }

    // Getters
    get accounts(): Observable<Account[]> {
        return this.store.accounts.asObservable();
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
}

interface Store {
    accounts: BehaviorSubject<Account[]>
}

interface ActionSet {
    loadAllAccounts: (payload: any) => void;
    updateAccount: (payload: any) => void;
    deleteAccount: (payload: any) => void;
}