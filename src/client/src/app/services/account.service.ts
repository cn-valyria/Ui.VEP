import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = "http://localhost:7071/api";
  }

  getAllAccounts(): Promise<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/accounts`).toPromise();
  }

  updateAccount(account: Account): Promise<Object> {
    return this.http.put(`${this.apiUrl}/accounts`, account).toPromise();
  }

  deleteAccount(accountId: number): Promise<Object> {
    return this.http.delete(`${this.apiUrl}/accounts/${accountId}`).toPromise();
  }
}
