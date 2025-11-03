import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { AddClient } from './add-client/add-client';
import { ClientInfomartionForm } from './client-infomation-form/client-information-form';
import { CreateUser } from './create-user/create-user';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './guards/admin.guards';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  // Protected routes
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'add-client', component: AddClient, canActivate: [AuthGuard] },
  { path: 'client-info-form', component: ClientInfomartionForm, canActivate: [AuthGuard] },
  { path: 'create-user', component: CreateUser,canActivate :[AdminGuard]},

  // Wildcard route (if path not found)
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
