import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenHttpInterceptor } from './interceptors/token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';

import { LoginComponent } from './login/login.component'; 
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { SideCreationAssociationComponent } from './associations-list/side-creation-association/side-creation-association.component';
import { SideSearchAssociationComponent } from './associations-list/side-search-association/side-search-association.component';
import { SideCreationUserComponent } from './users-list/side-creation-user/side-creation-user.component';
import { SlideSearchUserComponent } from './users-list/slide-search-user/slide-search-user.component';
import { CoreSearchUserComponent } from './users-list/slide-search-user/core-search-user/core-search-user.component';
import { SideModifyMembersComponent } from './associations-list/side-modify-members/side-modify-members.component';
import { CoreModifyMembersComponent } from './associations-list/side-modify-members/core-modify-members/core-modify-members.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    AssociationsListComponent,
    AccountSettingsComponent,
    SideCreationAssociationComponent,
    SideSearchAssociationComponent,
    SideCreationUserComponent,
    SlideSearchUserComponent,
    CoreSearchUserComponent,
    SideModifyMembersComponent,
    CoreModifyMembersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenHttpInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
