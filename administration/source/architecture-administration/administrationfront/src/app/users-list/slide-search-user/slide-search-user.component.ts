import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserInput } from 'src/app/interfaces/user';
import { SlideSearchUserService } from './slide-search-user.service';


@Component({
  selector: 'app-slide-search-user',
  templateUrl: './slide-search-user.component.html',
  styleUrls: ['../../app.component.scss']
})
export class SlideSearchUserComponent {
  @Input() users : UserInput[] = []
  @Input() displayedUsers : UserInput[] =[]
  @Output() displayedUsersChange = new EventEmitter<UserInput[]>();
  @Output() filterChange = new EventEmitter<void>();

  constructor(
    public searchUserService : SlideSearchUserService
  ){
  }

  change():void {
    this.displayedUsersChange.emit(this.searchUserService.filteredUserResearch(this.users))
    this.filterChange.emit()
  }

}
