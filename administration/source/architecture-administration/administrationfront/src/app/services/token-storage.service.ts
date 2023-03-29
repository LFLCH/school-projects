import { Injectable } from '@angular/core';

export interface AuthData {
  access_token: string;
  user_id:      number;
}

const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const IS_LOGGED_IN = 'isLoggedIn';
const IS_LOGGED = 'true';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public clear(): void {
    localStorage.clear();
  }
  public save(data : AuthData): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY );
    localStorage.removeItem(IS_LOGGED_IN);
    localStorage.setItem(TOKEN_KEY, data.access_token);
    localStorage.setItem(USERNAME_KEY,data.user_id+"")
    localStorage.setItem(IS_LOGGED_IN, IS_LOGGED);
  }
  public getToken(): string {
    const token = localStorage.getItem(TOKEN_KEY);
    return token === null ? '' : token;
  }
  public isLogged(): boolean {
    return (Boolean)(localStorage.getItem(IS_LOGGED_IN));
  }
  public getId() : number{
    const id = localStorage.getItem(USERNAME_KEY)
    if(id===null || id===undefined)return -1;
    else return +id;
  }
}
