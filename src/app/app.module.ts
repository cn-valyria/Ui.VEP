import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { AccountsComponent } from './admin/accounts/accounts.component';
import { AccountService } from './services/account.service';
import { VepAdminStore } from './store';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule
  ],
  providers: [AccountService, VepAdminStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
