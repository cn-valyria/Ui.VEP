import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AccountsComponent } from './admin/accounts/accounts.component';
import { AccountService } from './services/account.service';
import { VepAdminStore } from './store';
import { AccountEditDialog } from './admin/accounts/account-edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AccountsComponent,
    AccountEditDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [AccountService, VepAdminStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
