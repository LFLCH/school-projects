import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Association, AssociationWithRoles, AssoExport, AssoInputWithRoles, QueryAsso } from '../interfaces/association';
import { UserWithRole } from '../interfaces/user';
import { AssociationsListService } from './associations-list.service';
import { SideSearchAssociationService } from './side-search-association/side-search-association.service';




@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
  styleUrls: ['../app.component.scss'], 
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('350ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
}) 
export class AssociationsListComponent {
  @ViewChild('drawer')
  public drawer!: MatDrawer;
  
  displayedColumns : string[] = ['id','name'];
  assos : AssociationWithRoles[] = [];
  displayedAssos : AssociationWithRoles[] = []
  
  editing : boolean = false;
  editionMode :boolean = false;
  toggleEditionMode():void{
    this.editionMode = !this.editionMode;
  }
  
  searchMode : boolean = false;
  filteredAssoResearch():void {
    this.displayedIsCopy()
    this.displayedAssos= this.searchAssociationService.filteredAssoResearch(this.displayedAssos);
  }

  toggleSearchMode():void{
    this.searchMode=!this.searchMode;
    if(this.searchMode){
      this.filteredAssoResearch();
      }
      else  this.searchMode=false;
    }
    
    

    toggleSpecificMode(mode:string){
      if(mode=='search')this.toggleSearchMode();
      if(mode=='add')this.addAssoMode=!this.addAssoMode;
      if(mode=='modifmembers')this. modifMembersMode=!this.modifMembersMode;
      if(mode=='modifroles')this.modifRolesMode=!this.modifRolesMode;
    }

     modifMembersMode = false;
    assoSelected : AssociationWithRoles | null = null;

    modifRolesMode = false;

    toggleDrawer(draw:MatDrawer,concerned : string):void{
      if(draw.opened){
        const current = this.searchMode?'search':this.addAssoMode?'add':this.modifRolesMode?'modifroles':'modifmembers';
        if(current===concerned){
          draw.close();
          return;
        }
        else this.toggleSpecificMode(current)
      }
      this.toggleSpecificMode(concerned)
      draw.open();
    }
    
    updateSearchUrl():void{
      this.removeAllSearchUrl();
      const assoResearch = this.searchAssociationService.getAssoResearch();
      const query : QueryAsso = {
        id: (assoResearch.id!=='')?assoResearch.id+"":null,
        name: (assoResearch.name!=='')?assoResearch.name:null
      }
      this.setUrlMetadata(query)
      if(this.searchAssociationService.researchIsEqualToMock()){
        this.removeAllSearchUrl();
      }
    }

    setUrlMetadata(metaDatas :  QueryAsso): void {
      this.router.navigate([], {queryParams: metaDatas});
    }
    removeAllSearchUrl():void{
      const metaDatas = {'id':null,'name':null}
      this.router.navigate([], {
        queryParams: metaDatas,
        queryParamsHandling: 'merge'
      })
    }
  

  constructor(
    private snackBar: MatSnackBar,
    private searchAssociationService : SideSearchAssociationService,
    private router: Router,
    private route: ActivatedRoute,
    private service: AssociationsListService
) {
}

ngOnInit(): void {
  this.syncAssos().then(()=>{
    this.displayedIsCopy()
    const queryParams : Params =  this.route.snapshot.queryParams;
    this.initSearchFilter(queryParams)
    })
  }
  async syncAssos():Promise<void>{
    return new Promise<void>((res)=>{
      this.service.loadAssos().subscribe((response)=>{
        this.assos = response;
        this.sortingRoles(this.assos)
        res();
      })
    })
  }
  
  

  public getAssociationRoles(asso :AssociationWithRoles):string[]{
    return this.service.getAssociationRoles(asso);
  }

   sortingRoles(assos = this.displayedAssos):void{
    for(const asso of assos){
      asso.users.sort((u1,u2)=>{
        const r1 = this.service.numberOfOccurencesOfRole(u1.role,asso)
        const r2 = this.service.numberOfOccurencesOfRole(u2.role,asso)
        if(r1===r2) {
          const comprole = u1.role.localeCompare(u2.role);
          if(comprole==0)return u1.id - u2.id
          else return comprole;
        }
        else return  r1-r2;
      })
    }
  }

  colorOfRole(role: string, asso : AssociationWithRoles):string {
    return this.service.colorOfRole(role,asso);
  }

  modfyingRolesAsso(asso : AssociationWithRoles):void {
    this.editing=true
    for(const user of asso.users){
      if(user.role.length==0){
        this.showMessage("Le nom du rôle ne doit pas être vide")
        break;
      }
    }
  }


  public assoEquivalent(displayedAssoId : number):AssociationWithRoles{
    return this.assos.filter(a=>{return a.id===displayedAssoId})[0]
  }


  initSearchFilter(queryParams : Params):void {
     const assoResearch : Association = this.searchAssociationService.getMock()
      if(queryParams['id']!==undefined)assoResearch.id=queryParams['id']
      if(queryParams['name']!==undefined)assoResearch.name=queryParams['name']
      this.searchAssociationService.setAssoResearch(assoResearch)
      if(!this.searchAssociationService.researchIsEqualToMock())this.toggleDrawer(this.drawer,'search')
  }

  enter(event:any):void {
    event.target.blur();
  }
  modifyingasso(asso : Association):void {
    this.editing = true;
    const expAsso : AssoExport = {
      idUsers: asso.users.map(user=>user.id),
      name: asso.name
    }
    this.service.setAsso(expAsso,+asso.id).subscribe(resp=>{
      this.editing=false;
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
  delete(asso : AssociationWithRoles):void{
    this.editing = true;
    this.service.deleteAsso(+asso.id).subscribe(resp=>{
      this.displayedAssos = this.assos;
      const index = this.assos.indexOf(asso)
      this.assos.splice(index,1)
      this.filteredAssoResearch()
      this.expandedElement = null;
      this.assoSelected = null;
      this.editing = false;
      this.showMessage('Association supprimée');
    })
  }
  
  addAssoMode : boolean = false;

  addAssoRow(asso : AssoExport):void{
    if(asso!==undefined){
     this.service.addAsso(asso).subscribe(res=>{
          this.syncAssos().then(()=>{
            this.displayedIsCopy()
            this.showMessage('Association ajoutée')
          })
    })}
  }
  
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: AssociationWithRoles | null = null;
  toggleDetails(element :AssociationWithRoles,event : string):void {
    if(!this.editionMode || event==='arrow')this.expandedElement = this.expandedElement === element ? null : element;
    if(this.expandedElement!==null)this.assoSelected = this.expandedElement;
  }
  displayedIsCopy():void {
    this.displayedAssos = []
    for(const asso of this.assos){
      const users : UserWithRole[] = []
      for(const user of asso.users){
        users.push({
          id: user.id,
          password: user.password,
          lastname: user.lastname,
          firstname: user.firstname,
          age: user.age,
          role: user.role
        })
      }
      this.displayedAssos.push({
        id: asso.id,
        name: asso.name,
        users: users
      })
    }
  }

  checking(asso : AssociationWithRoles){
    const assoBefore = this.assoEquivalent(+asso.id);
    if(asso.users<assoBefore.users){
      const user = assoBefore.users.filter(ub=>{
        return asso.users.filter(u=>{return u.id==ub.id}).length==0
      })[0]
      user.role='Membre'; // On remet l'utilisateur à membre lorsqu'il a été décoché
    }
  }
  
}

