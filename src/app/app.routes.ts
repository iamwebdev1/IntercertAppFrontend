import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Signup } from './signup/signup';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { AddClient } from './add-client/add-client';
import { ClientInfomartionForm } from './client-infomation-form/client-information-form';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-client',
    component: AddClient,
    canActivate: [AuthGuard],
  },
  {
    path: 'client-info-form',
    component: ClientInfomartionForm,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
