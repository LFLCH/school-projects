import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSimple } from '../interfaces/user';
import { UsersListService } from '../users-list/users-list.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private tokenStorageService: TokenStorageService,
    private userListService : UsersListService
  ) { }

  userSession():Observable<UserSimple>{
    return this.userListService.loadUser(this.tokenStorageService.getId())
  }
 

}
