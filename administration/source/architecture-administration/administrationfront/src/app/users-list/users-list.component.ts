import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserInput } from '../interfaces/user';
import { SlideSearchUserService } from './slide-search-user/slide-search-user.service';
import { UsersListService } from './users-list.service';


export interface QueryUser {
    id: string|null;
    firstname: string|null;
    lastname: string|null;
    age: string|null;
}



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('350ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UsersListComponent implements OnInit{
  
  @ViewChild('drawer')
  public drawer!: MatDrawer;
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  users :UserInput[]= [];
  displayedUsers : UserInput[] = [];

  constructor(
    private snackBar: MatSnackBar,
    public searchUserService :SlideSearchUserService,
    private router: Router,
    private route: ActivatedRoute,
    public service:UsersListService
) {
}


ngOnInit(): void {
  this.syncUsers().then(()=>{
      this.displayedUsers=this.users;
      const queryParams : Params =  this.route.snapshot.queryParams;
      // plus tard utiliser  this.route.queryParams.subscribe(p => {}), 
     // qui permet de mettre à jour directement la recherche si l'url vient dêtre changée. 
     //Attention, cela provoque plusieurs réactions qu'il faut gérer
     this.initSearchFilter(queryParams)
    })
    
  }
  initSearchFilter(queryParams : Params):void {
    const userResearch : UserInput = this.searchUserService.getMock()
      if(queryParams['id']!==undefined)userResearch.id=queryParams['id']
      if(queryParams['lastname']!==undefined)userResearch.lastname=queryParams['lastname']
      if(queryParams['firstname']!==undefined)userResearch.firstname=queryParams['firstname']
      if(queryParams['age']!==undefined)userResearch.age=queryParams['age'];
      this.searchUserService.setUserResearch(userResearch)
      if(!this.searchUserService.researchIsEqualToMock())this.toggleDrawer(this.drawer,'search')
  }

  enter(event:any):void {
    event.target.blur();
  }
  
  editing : boolean = false;
  editionMode :boolean = false;
  toggleEditionMode():void{
    this.editionMode = !this.editionMode;
  }

  searchMode : boolean = false;

  toggleSearchMode():void{
    this.searchMode=!this.searchMode;
    if(this.searchMode){
      this.filteredUserResearch();
      this.updateSearchUrl();
    }
    else this.closeSearchMode();
  }
  
  updateSearchUrl():void{
    this.removeAllSearchUrl();
    const userResearch = this.searchUserService.getUserResearch();
    const query : QueryUser = {
      id:  (userResearch.id==''?null:userResearch.id+""),
      firstname: (userResearch.firstname=='')?null:userResearch.firstname,
      lastname: (userResearch.lastname=='')?null:userResearch.lastname,
      age: (userResearch.age=='')?null:userResearch.age+""
    }
    this.setUrlMetadata(query)
    if(this.searchUserService.researchIsEqualToMock()){
      this.removeAllSearchUrl();
    }
  }
  setUrlMetadata(metaDatas :  QueryUser): void {
    this.router.navigate([], {queryParams: metaDatas});
  }
  removeAllSearchUrl():void{
    const metaDatas = {'id':null,'firstname':null,'lastname':null,'age':null}
    this.router.navigate([], {
      queryParams: metaDatas,
      queryParamsHandling: 'merge'
    })
  }
  
  closeSearchMode():void{
    this.searchMode=false;
  }
  
  toggleDrawer(draw:MatDrawer,concerned : string):void{
    const possible = ['search','add']
    if(!possible.includes(concerned))return;
    if(draw.opened){
      const current = this.searchMode?'search':'add';
      if(current===concerned){
        draw.close();
        return;
      }
      else {
        if(current=='search')this.toggleSearchMode();
        if(current=='add')this.addUserMode=!this.addUserMode;
      }
    }
    if(concerned=='search')this.toggleSearchMode();
    if(concerned=='add')this.addUserMode=!this.addUserMode;
    draw.open();
  }

 

  filteredUserResearch():void{
    this.displayedUsers = this.searchUserService.filteredUserResearch(this.users);
  }

  async syncUsers():Promise<void> {
    return new Promise<void>((res)=>{
      this.service.loadUsers().subscribe((users)=>{
        this.service.loadAllAssosInService().then(()=>{
          this.users = users;
          this.displayedUsers = this.users;
          res()
        })
      })
    })
  }
  
  modifyinguser(user : UserInput):void {
    this.editing = true;
    this.service.setUser(user).subscribe(resp=>{
      this.editing=false
    })
  }

  showMessage(message : string){
    this.openSnackBar(message);
      setTimeout( ()=>{
        this.snackBar.dismiss();
      }, 2000)
  }
  openSnackBar(textInfo :string) {
    const verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    this.snackBar.open(textInfo, '', {
      verticalPosition: verticalPosition,
    });
  }
  delete(user : UserInput):void{
   this.service.deleteUser(user).subscribe(resp=>{
      const index = this.users.indexOf(user)
      this.users.splice(index,1)
      this.syncUsers().then(()=>{
        this.filteredUserResearch()
        this.showMessage('Utilisateur supprimé');
      })
    })
  }

  addUserMode : boolean = false;

  addUserRow(user : UserInput):void{
    if(user!==undefined){
      this.service.addUser(user).subscribe(res=>{
        this.syncUsers();
        this.showMessage('Utilisateur ajouté')
      })
    }
  }

  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: UserInput | null = null;
  toggleDetails(element :UserInput,event : string):void {
    if(!this.editionMode || event==='arrow')this.expandedElement = this.expandedElement === element ? null : element;
  }
}

