import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Association, AssoExport } from '../interfaces/association';
import { Constants } from '../interfaces/constants';


const url=Constants.url;

@Injectable({
  providedIn: 'root'
})
export class AssociationsListService {

  constructor(
    private http: HttpClient
  ) { }

  loadAssos():Observable<Association[]>{
      return  this.http.get<Association[]>(url+'/associations');
  }
  
  setAsso(expAsso:AssoExport,id : number):Observable<Association>{
    return  this.http.put<Association>(url+'/associations/'+id,expAsso)
  }

  deleteAsso(id : number):Observable<void>{
    return  this.http.delete<void>(url+"/associations/"+id);
  }

  addAsso(asso : AssoExport):Observable<Association>{
    return  this.http.post<Association>(url+'/associations',asso)
  }

  loadAsso(id:number):Observable<Association>{
    return this.http.get<Association>(url+'/associations/'+id)
  }

  userAssos(id: number,assosdispos :Association[]):Association[]{
    const assos : Association [] = assosdispos.filter(asso=>{
      return asso.users.filter(u=>{
        return u.id === id
      }).length>0
    })
    return assos
  }



}
