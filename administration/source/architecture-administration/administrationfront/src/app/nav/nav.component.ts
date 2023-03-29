import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  connecte : boolean = false;
  
  public constructor( 
    private tokenStorageService: TokenStorageService, 
    private router : Router
  ){
  }
  ngOnInit(): void {
    this.connecte = this.tokenStorageService.isLogged()
  }
  
  logout(): void {
    this.tokenStorageService.clear();
   // this.router.navigateByUrl('')
   window.location.reload();
  }
}
