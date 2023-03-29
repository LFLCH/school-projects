import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Association } from '../side-creation-association/side-creation-association.component';
import { SideSearchAssociationService } from './side-search-association.service';



@Component({
  selector: 'app-side-search-association',
  templateUrl: './side-search-association.component.html',
  styleUrls: ['../../app.component.scss']
})
export class SideSearchAssociationComponent {
  @Input() assos : Association[]=[]
  @Input() displayedAssos : Association [] = []
  @Output() displayedAssosChange =  new EventEmitter<Association[]>();
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
