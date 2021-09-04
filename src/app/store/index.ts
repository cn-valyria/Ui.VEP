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
        const data = this.accountService.getAllAccounts();
        this._accounts = [...data];
        this.store.accounts.next([...this._accounts]);
    }

    private deleteAccount(accountId: number): void {
        this._accounts.forEach((account, i) => {
            if (account.nationId === accountId) { this._accounts.splice(i, 1) }
        });
        this.store.accounts.next([...this._accounts]);
    }
}

interface Store {
    accounts: BehaviorSubject<Account[]>
}

interface ActionSet {
    loadAllAccounts: (payload: any) => void;
    deleteAccount: (payload: any) => void;
}