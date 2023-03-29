import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Association, AssociationWithRoles } from 'src/app/interfaces/association';

export interface AssoExport{
  idUsers: number[];
  name:    string;
}

@Component({
  selector: 'app-side-creation-association',
  templateUrl: './side-creation-association.component.html',
  styleUrls: ["../../app.component.scss"]
})
export class SideCreationAssociationComponent {
  
  @Output()  creation = new EventEmitter<AssoExport>();

  constructor(){
  }

  creatingAsso : AssociationWithRoles = {
    id: '',
    name: '',
    users: []
  }


  ready():boolean{
    return this.creatingAsso.name.length>0;
  }

  validation():void {
    const newAsso : AssoExport = {
      idUsers: this.creatingAsso.users.map(user=>{return user.id}),
      name: this.creatingAsso.name
    }
    this.creation.emit(newAsso);
    this.resetCreation();
  }

  resetCreation():void {
    this.creatingAsso = {
      id: '',
      name: '',
      users: []
    }
  }


}
