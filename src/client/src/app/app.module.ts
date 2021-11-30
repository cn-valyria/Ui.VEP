import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AccountsComponent } from './admin/accounts/accounts.component';
import { AccountService } from './services/account.service';
import { TransactionsService } from './services/transactions.service';
import { VepAdminStore } from './store';
import { AccountEditDialog } from './admin/accounts/account-edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TransactionsComponent } from './admin/transactions/transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AccountsComponent,
    AccountEditDialog,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [AccountService, TransactionsService, VepAdminStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
