import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Account } from "../models/account";
import { AccountService } from "../services/account.service";
import { Collection } from "./collection";
import { State } from "./state";
import { StoreBase } from "./storeBase";

@Injectable({
    providedIn: 'root'
})
export class AccountStore extends StoreBase {
    
    // Internal properties
    private state: State<Account>;
    
    // Constructor
    constructor(private accountService: AccountService) {
        super({
            loadAllAccounts: () => this.loadAllAccounts(),
            createAccount: (nationId: number) => this.createAccount(nationId),
            updateAccount: (account: Account) => this.updateAccount(account),
            deleteAccount: (accountId: number) => this.deleteAccount(accountId),
        });

        this.state = {
            accounts: new BehaviorSubject<Collection<Account>>({ totalCount: undefined, data: undefined })
        };
    }

    // Getters
    get accounts(): Observable<Account[]> {
        return this.state.accounts
            .pipe(
                filter(collection => collection.data !== undefined),
                map(collection => collection.data as Account[])
            );
            
    }

    // Internal action implementations
    private async loadAllAccounts() {
        const data = await this.accountService.getAllAccounts();
        this.state.accounts.next(this.toCollection(data));
    }

    private async createAccount(nationId: number) {
        const createdAccount = await this.accountService.createAccount(nationId);
        const allAccounts = this.state.accounts.value.data ?? [];
        allAccounts.push(createdAccount);
        this.state.accounts.next(this.toCollection(allAccounts));
    }

    private async updateAccount(account: Account) {
        await this.accountService.updateAccount(account);
        let allAccounts = this.state.accounts.value.data ?? [];
        const i = allAccounts.findIndex(a => a.id === account.id);
        const updatedAccount = {
            ...allAccounts[i],
            role: account.role,
            uniqueCode: account.uniqueCode,
            discord: account.discord,
            discordUniqueId: account.discordUniqueId,
            hasForeignMinistry: account.hasForeignMinistry,
            hasFederalAidCommission: account.hasFederalAidCommission,
            hasDisasterReliefAgency: account.hasDisasterReliefAgency
        };

        allAccounts = [...allAccounts.splice(0, i), updatedAccount, ...allAccounts.splice(i + 1)];
        this.state.accounts.next(this.toCollection(allAccounts));
    }

    private async deleteAccount(accountId: number) {
        await this.accountService.deleteAccount(accountId);
        let allAccounts = this.state.accounts.value.data ?? [];
        const i = allAccounts.findIndex(a => a.id === accountId);
        const accounts = [...allAccounts];
        accounts.splice(i, 1);
        allAccounts = accounts;
        this.state.accounts.next(this.toCollection(allAccounts));
    }

    private toCollection(accountList: Account[]): Collection<Account> {
        return {
            totalCount: accountList.length,
            data: [...accountList]
        };
    }
}