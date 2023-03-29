import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordChange } from '../interfaces/account';
import { Constants } from '../interfaces/constants';
import { UserSimple } from '../interfaces/user';
import { TokenStorageService } from '../services/token-storage.service';

const url=Constants.url;



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http : HttpClient,
    private tokenService : TokenStorageService
  ) { }

  public changePassword(new_password : string):Observable<UserSimple>{
    const change : PasswordChange = {
      token:this.tokenService.getToken(),
      new_password
    }
    return  this.http.post<UserSimple>(url+'/account/password',change)
  }
}
