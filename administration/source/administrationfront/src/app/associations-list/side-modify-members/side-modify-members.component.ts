import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssociationWithRoles } from 'src/app/interfaces/association';

@Component({
  selector: 'app-side-modify-members',
  templateUrl: './side-modify-members.component.html',
  styleUrls: ['../../app.component.scss']
})
export class SideModifyMembersComponent {

  @Input() asso!: AssociationWithRoles;
  @Output()  checking = new EventEmitter<void>();
  
  modif():void {
    this.checking.emit()
  }
 
}
