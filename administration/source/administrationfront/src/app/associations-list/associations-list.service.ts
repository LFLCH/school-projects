import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Association, AssociationWithRoles, AssoExport, AssoInputWithRoles } from '../interfaces/association';
import { Constants } from '../interfaces/constants';


const url=Constants.url;

@Injectable({
  providedIn: 'root'
})
export class AssociationsListService {

  constructor(
    private http: HttpClient
  ) { }

  loadAssos():Observable<AssociationWithRoles[]>{
      return  this.http.get<AssociationWithRoles[]>(url+'/associations/withroles');
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

  loadAsso(id:number):Observable<AssociationWithRoles>{
    return this.http.get<AssociationWithRoles>(url+'/associations/'+id+'/withroles')
  }

  userAssos(id: number,assosdispos :Association[]):Association[]{
    const assos : Association [] = assosdispos.filter(asso=>{
      return asso.users.filter(u=>{
        return u.id === id
      }).length>0
    })
    return assos
  }

  colorOfRole(role : string, asso : AssociationWithRoles):string{
    const roles = this.getAssociationRoles(asso)
    const seed = 200+360*(Math.abs(roles.indexOf(role)+1)/roles.length)
    return 'hsl('+(seed%360)+',75%,54%)'
  }

  public getAssociationRoles(asso :AssociationWithRoles):string[]{
    const roles : string[]= []
    for(const user of asso.users){
      if(!(roles.includes(user.role))) roles.push(user.role)
    }
    return roles;
  }

  public modifyRole(idUser : number, idAsso : number,role : string):Observable<any>{
    return this.http.put<any>(url+'/roles/'+idUser+'/'+idAsso,{"name":role});
  }

  public numberOfOccurencesOfRole(role : string, asso : AssociationWithRoles):number{
    let n = 0
    for(const user of asso.users){
      if(user.role.localeCompare(role)==0)n+=1;
    }
    return n;
  }
}
