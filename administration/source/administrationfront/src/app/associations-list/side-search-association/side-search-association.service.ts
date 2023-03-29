import { Injectable } from '@angular/core';
import { Association, AssociationWithRoles } from 'src/app/interfaces/association';


@Injectable({
  providedIn: 'root'
})
export class SideSearchAssociationService {
  
  getMock():Association {
    return {
      id: '',
      name: '',
      users: []
    };
  }
  
  constructor() { }

  private assoResearch : Association  = this.getMock();
  resetSearch():void {
    this.assoResearch = this.getMock();
  }

  researchIsEqualToMock():boolean {
    return JSON.stringify(this.assoResearch)===JSON.stringify(this.getMock());
  }
  filteredAssoResearch(assos : AssociationWithRoles[]):AssociationWithRoles[]{
    let displayedAssos : AssociationWithRoles[] = [];
    if(this.researchIsEqualToMock())displayedAssos=assos;
    else {
      displayedAssos = assos.filter((asso)=>{
        const constatID = (asso.id == this.assoResearch.id) || this.assoResearch.id=='';
        const constatName = this.assoResearch.name.length==0 || asso.name.includes(this.assoResearch.name);
        const constat = constatID && constatName;
        return constat;
      })
    }
    return displayedAssos;
  }

  getAssoResearch():Association{
    return this.assoResearch;
  }

  setAssoResearch(asso : Association):void {
    this.assoResearch = asso;
  }
}
