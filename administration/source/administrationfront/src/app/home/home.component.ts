import { Component,OnInit } from '@angular/core';
import { UserInput } from '../interfaces/user';
import { SessionService } from '../services/session.service';
import { TokenStorageService } from '../services/token-storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  connecte : boolean = false;
  user : UserInput | undefined

  public constructor( 
    private tokenStorageService: TokenStorageService,
    private sessionService : SessionService
    ){
  }
  ngOnInit(): void {
    this.connecte = this.tokenStorageService.isLogged()
    if(this.connecte){
      this.sessionService.userSession().subscribe(user=>{
        this.user = user;
      })
    }
  }


}
