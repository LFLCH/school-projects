import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Association, AssoExport, QueryAsso } from '../interfaces/association';
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
  assos : Association[] = [];
  displayedAssos : Association[] = []
  
  editing : boolean = false;
  editionMode :boolean = false;
  toggleEditionMode():void{
    this.editionMode = !this.editionMode;
  }
  
  searchMode : boolean = false;
  filteredAssoResearch():void {
   this.displayedAssos= this.searchAssociationService.filteredAssoResearch(this.assos);
  }

  toggleSearchMode():void{
    this.searchMode=!this.searchMode;
    if(this.searchMode){
      this.filteredAssoResearch();
      }
      else this.closeSearchMode();
    }
    
    closeSearchMode():void{
      this.searchMode=false;
    }

    toggleSpecificMode(mode:string){
      if(mode=='search')this.toggleSearchMode();
      if(mode=='add')this.addAssoMode=!this.addAssoMode;
      if(mode==' modifmembers')this. modifMembersMode=!this. modifMembersMode;
    }

     modifMembersMode = false;
    assoSelected = null;

    toggleDrawer(draw:MatDrawer,concerned : string):void{
      if(draw.opened){
        const current = this.searchMode?'search':this.addAssoMode?'add':' modifmembers';
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
    this.displayedAssos = this.assos;
    const queryParams : Params =  this.route.snapshot.queryParams;
    this.initSearchFilter(queryParams)
    })
  }
  async syncAssos():Promise<void>{
    return new Promise<void>((res)=>{
      this.service.loadAssos().subscribe((response)=>{
        this.assos = response;
        res();
      })
    })
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
  delete(asso : Association):void{
    this.service.deleteAsso(+asso.id).subscribe(resp=>{
      const index = this.assos.indexOf(asso)
      this.assos.splice(index,1)
      this.displayedAssos = []
      for(const asso of this.assos){
        this.displayedAssos.push(asso)
      }
      this.showMessage('Association supprimée');
    })
  }
  
  addAssoMode : boolean = false;

  addAssoRow(asso : AssoExport):void{
    if(asso!==undefined){
     this.service.addAsso(asso).subscribe(res=>{
          this.syncAssos().then(()=>{
            this.displayedAssos = this.assos;
            this.showMessage('Association ajoutée')
          })
    })}
  }

  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: Association | null = null;
  toggleDetails(element :Association,event : string):void {
    if(!this.editionMode || event==='arrow')this.expandedElement = this.expandedElement === element ? null : element;
  }
  
}
