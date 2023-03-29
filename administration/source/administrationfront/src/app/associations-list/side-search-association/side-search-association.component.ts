import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Association, AssociationWithRoles } from 'src/app/interfaces/association';
import { SideSearchAssociationService } from './side-search-association.service';



@Component({
  selector: 'app-side-search-association',
  templateUrl: './side-search-association.component.html',
  styleUrls: ['../../app.component.scss']
})
export class SideSearchAssociationComponent {
  @Input() assos : AssociationWithRoles[]=[]
  @Input() displayedAssos : AssociationWithRoles [] = []
  @Output() displayedAssosChange =  new EventEmitter<AssociationWithRoles[]>();
  @Output() filterChange = new EventEmitter<void>();

  assoResearch:Association;

  constructor(
    public searchAssociationService : SideSearchAssociationService
  ){
    this.assoResearch = searchAssociationService.getAssoResearch();
  }


  filteredAssoResearch():void {
    this.displayedAssos= this.searchAssociationService.filteredAssoResearch(this.assos);
    this.displayedAssosChange.emit(this.displayedAssos);
    this.filterChange.emit();
  }

  resetSearch():void {
    this.searchAssociationService.resetSearch();
    this.assoResearch = this.searchAssociationService.getAssoResearch();
  }

  researchIsEqualToMock():boolean{
    return this.searchAssociationService.researchIsEqualToMock();
  }


  
  
  

  

}
