import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Association } from 'src/app/interfaces/association';

@Component({
  selector: 'app-side-modify-members',
  templateUrl: './side-modify-members.component.html',
  styleUrls: ['../../app.component.scss']
})
export class SideModifyMembersComponent {

  @Input() asso!: Association;
  @Output()  checking = new EventEmitter<void>();
  
  modif():void {
    this.checking.emit()
  }
 
}
