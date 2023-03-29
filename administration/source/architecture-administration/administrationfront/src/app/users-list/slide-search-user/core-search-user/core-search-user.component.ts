import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserInput } from 'src/app/interfaces/user';
import { SlideSearchUserService } from '../slide-search-user.service';

@Component({
  selector: 'app-core-search-user',
  templateUrl: './core-search-user.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class CoreSearchUserComponent {
  @Input() users : UserInput[] = []
  @Input() displayedUsers : UserInput[] =[]
  @Output() displayedUsersChange = new EventEmitter<UserInput[]>();
  @Output() filterChange = new EventEmitter<void>();

  userResearch : UserInput;
  constructor(
    public searchUserService : SlideSearchUserService
  ){
    this.userResearch = searchUserService.getUserResearch()
  }

  filteredUserResearch():void{
    this.displayedUsers = this.searchUserService.filteredUserResearch(this.users);
    this.displayedUsersChange.emit(this.displayedUsers)
    this.filterChange.emit()
  }

  resetSearch():void{
    this.searchUserService.resetSearch();
    this.userResearch = this.searchUserService.getUserResearch();
  }
  researchIsEqualToMock():boolean{
    return this.searchUserService.researchIsEqualToMock();
  }
}
