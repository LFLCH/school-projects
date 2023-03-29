import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  { path: 'users', component: UsersListComponent, canActivate :[AuthGuard] },
  { path: 'associations', component:AssociationsListComponent, canActivate :[AuthGuard] },
  { path: 'account', component:AccountSettingsComponent, canActivate :[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
