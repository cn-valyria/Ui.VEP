import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AccountsComponent } from './admin/accounts/accounts.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'admin/accounts', component: AccountsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
