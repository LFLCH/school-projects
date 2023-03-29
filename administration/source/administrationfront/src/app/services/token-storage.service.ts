import { Injectable } from '@angular/core';

export interface AuthData {
  access_token: string;
  user_id:      number;
  token_end_time: number;
}

const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const IS_LOGGED_IN = 'isLoggedIn';
const IS_LOGGED = 'true';
const TOKEN_END = 'token_end'


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  public clear(): void {
    localStorage.clear();
  }
  public save(data : AuthData): void {
    localStorage.clear();
    localStorage.setItem(TOKEN_KEY, data.access_token);
    localStorage.setItem(USERNAME_KEY,data.user_id+"")
    localStorage.setItem(TOKEN_END,data.token_end_time+'')
    localStorage.setItem(IS_LOGGED_IN, IS_LOGGED);

  }
  public getToken(): string {
    const token = localStorage.getItem(TOKEN_KEY);
    return token === null ? '' : token;
  }
  public isLogged(): boolean {
    return ((Boolean)(localStorage.getItem(IS_LOGGED_IN))) && this.stillActive();
  }
  public getId() : number{
    const id = localStorage.getItem(USERNAME_KEY)
    if(id===null || id===undefined)return -1;
    else return +id;
  }

  private stillActive():boolean{
    const end_time =  +localStorage.getItem(TOKEN_END)!
    return end_time>Date.now()
  }
}
