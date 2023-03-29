import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserSimple } from 'src/app/interfaces/user';

export interface AssoExport{
  idUsers: number[];
  name:    string;
}
export interface Association {
  id:    number | string;
  name:  string;
  users: UserSimple[];
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

  creatingAsso : Association = {
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
