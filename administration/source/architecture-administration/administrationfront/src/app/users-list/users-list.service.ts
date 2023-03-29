import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssociationsListService } from '../associations-list/associations-list.service';
import { Association } from '../interfaces/association';
import { UserInput, UserSimple } from '../interfaces/user';
import { Constants } from '../interfaces/constants';


const url=Constants.url;

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  private assos : Association[] = []
  constructor(
    private http:HttpClient,
    private assosListService : AssociationsListService
  ) {
  }

  loadUsers():Observable<UserSimple[]>{
      return this.http.get<UserSimple[]>(url+'/users');
  }
  
  setUser(user:UserInput):Observable<UserSimple>{
    return  this.http.put<UserSimple>(url+'/users/'+user.id,user);
  }

  deleteUser(user:UserInput):Observable<void>{
    return this.http.delete<void>(url+"/users/"+user.id);
  }

  addUser(user:UserInput):Observable<UserInput>{
    return this.http.post<UserInput>(url+'/users',user);
  }

  loadUser(id:number):Observable<UserSimple>{
    return this.http.get<UserSimple>(url+'/users/'+id)
  }

  loadAllAssosInService():Promise<void>{
    return new Promise<void>(res=>{
    this.assosListService.loadAssos().subscribe(assos=>{
      this.assos=assos;
      res()
    })
    })
  }

  getUserAssos(id : number):Association[]{
    return this.assosListService.userAssos(id,this.assos)
  }

}
