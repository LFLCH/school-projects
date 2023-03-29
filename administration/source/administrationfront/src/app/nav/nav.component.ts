import { Component } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  connecte : boolean = false;
  
  public constructor( 
    private tokenStorageService: TokenStorageService
  ){
  }
  ngOnInit(): void {
    this.connecte = this.tokenStorageService.isLogged()
  }
  
  logout(): void {
    this.tokenStorageService.clear();
   window.location.reload();
  }
}
