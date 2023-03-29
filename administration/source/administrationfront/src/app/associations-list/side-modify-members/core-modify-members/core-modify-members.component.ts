import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { AssoInput, AssoInputWithRoles } from 'src/app/interfaces/association';
import { UserInput, UserInputWithRole, UserWithRole } from 'src/app/interfaces/user';
import { SlideSearchUserService } from 'src/app/users-list/slide-search-user/slide-search-user.service';
import { UsersListService } from 'src/app/users-list/users-list.service';

@Component({
  selector: 'app-core-modify-members',
  templateUrl: './core-modify-members.component.html',
  styles : ['mat-accordion .mat-expansion-panel-header-description{ justify-content: space-between;align-items: center;}'],
  styleUrls: ['../../../app.component.scss']
})
export class CoreModifyMembersComponent {

  @Input() asso!: AssoInputWithRoles;
  @Output()  checking = new EventEmitter<void>();
  
  users:UserInputWithRole[]=[] // All Possible Users
  displayedUsers : UserInputWithRole[] = [] // Users displayed by the filter
  selectedUsers :UserInputWithRole[] = [] // Current members of the association
  checked : UserInputWithRole[] = [] // Users selected by the user during the session
  
  constructor(
    public searchUserService : SlideSearchUserService,
    public usersListService : UsersListService,
    private cdRef:ChangeDetectorRef
    ){
    }
    ngOnInit(): void {
      this.load();
    }
    
    ngOnChanges(){
      this.updateSelection()
      this.cdRef.detectChanges()
    }

    private updateSelection():void {
      this.selectedUsers = []
      for(const user of this.asso.users){
        const equiv = this.userInstanceInUsers(user)
        if(equiv!==undefined) {
          this.selectedUsers.push(equiv)
        }
      }
    }
    
    
    
    load():void{
      this.users=[]
      this.displayedUsers  = []
      this.selectedUsers =[]
      this.usersListService.loadUsers().subscribe(users=>{
        this.users = users.map(user=>{
          const urole : UserWithRole = {
            id: user.id,
            password: user.password,
            lastname: user.lastname,
            firstname: user.firstname,
            age: user.age,
            role: 'Membre'
          }
          for(const us of this.asso.users){
            if(us.id==user.id){
              urole.role=us.role;
              break;
            }
          }
          return urole
        });
        this.updateSelection()
        this.searching()
      })
    }
    
    
    userChecking():void {
     this.selectedUsers = this.checked;

      this.validation();
    }

    isChecked(user : UserInput):boolean{
      for(const u of this.checked){
        if(this.userEquals(user,u))return true;
      }
      return false;
    }

    isDisplayed(user:UserInput):boolean{
      for(const u of this.displayedUsers){
        if(this.userEquals(user,u))return true;
      }
      return false;
    }
    
    isPartOfSelection(user:UserInput):boolean{
      for(const u of this.selectedUsers){
        if(this.userEquals(user,u))return true;
      }
      return false;
    }
    


    private userInstanceInUsers(user : UserInputWithRole):UserInputWithRole|undefined{
      for(const u of this.users){
        if(this.userEquals(u,user))return u
      }
      return undefined;
    }

    private userEquals(u1 : UserInput,u2 : UserInput):boolean{
      return u1.id===u2.id;
    }
    
    
    validation():void {
      this.asso.users = Array.from(this.selectedUsers.values())
      this.checking.emit()
    }

    searching():void {
      this.displayedUsers = this.searchUserService.filteredUserResearch(this.users).map(u=>{
        const presenceInAsso = this.asso.users.filter(ur=>{
          return u.id == ur.id;
        })
        if(presenceInAsso.length>0)return presenceInAsso[0]
        else return {
          id: u.id,
          password: u.password,
          lastname: u.lastname,
          firstname: u.firstname,
          age: u.age,
          role: 'Membre'
        }
      })
    }
}
