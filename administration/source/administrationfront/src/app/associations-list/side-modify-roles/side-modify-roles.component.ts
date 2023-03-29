import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssociationWithRoles } from 'src/app/interfaces/association';
import { UserWithRole } from 'src/app/interfaces/user';
import { AssociationsListService } from '../associations-list.service';

@Component({
  selector: 'app-side-modify-roles',
  templateUrl: './side-modify-roles.component.html',
  styleUrls: ['./side-modify-roles.component.scss']
})
export class SideModifyRolesComponent {

  @Input() asso!: AssociationWithRoles;
  @Output()  modifying = new EventEmitter<void>();
  @Output()  changed = new EventEmitter<void>();

  constructor(public assoService : AssociationsListService){}

  changeRole(user : UserWithRole):void{
    if(user.role.length>0){
      this.assoService.modifyRole(user.id,+this.asso.id,user.role).subscribe((res)=>{
        this.changed.emit()
      })
    }
  }

  typingRole():void{
    this.modifying.emit()
  }

}
