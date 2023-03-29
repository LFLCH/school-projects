import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserInput, UserSimple } from '../interfaces/user';
import { SessionService } from '../services/session.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UsersListService } from '../users-list/users-list.service';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  user : UserSimple ={
    id: 0,
    password: '',
    lastname: '',
    firstname: '',
    age: 0
  }
  userSynced : UserSimple = structuredClone(this.user)
  
  public constructor(
    private sessionService:SessionService,
    private accountService:AccountService,
    private userService:UsersListService,
    private tokenStorageService:TokenStorageService,
    private snackBar: MatSnackBar
  ){ }

  ngOnInit(){
    this.sessionService.userSession().subscribe(user=>{
      this.user = user;
      user.password = 'password';
      this.userSynced = structuredClone(user)
      this.userSynced.password=''
    })
  }

  editionMode :boolean = false;
  editing : boolean = false;
  
  toggleEditionMode():void{
    this.editionMode = !this.editionMode;
    if(!this.editing){
      if(this.editionMode){
        this.user.password='';
      }
      else{
        this.user.password='password';
      }
    }
  }

  modif():void{
    this.editing = true
  }

  confirm():void{
    this.userService.setUser(this.user).subscribe((user)=>{
      if(this.user.password.length>0){
        this.accountService.changePassword(this.user.password).subscribe(user=>{
          this.userSynchronised(user)
        })
      }
      else {
        this.userSynchronised(user)
      }
    })
  }

  private userSynchronised(newUser : UserSimple):void {
    this.userSynced=newUser;
          this.userSynced.password=''
          this.editing = false;
          this.editionMode = false;
          this.openSnackBar('Informations mises à jour')
          setTimeout( ()=>{
            this.snackBar.dismiss();
          }, 2000)
  }

  delete():void{
    this.userService.deleteUser(this.user).subscribe(()=>{
      this.tokenStorageService.clear();
      window.location.reload();
    })
  }

  openSnackBar(textInfo :string) {
    const verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    this.snackBar.open(textInfo, '', {
      verticalPosition: verticalPosition,
    });
  }

  cancel():void{
    this.user = structuredClone(this.userSynced)
    this.editing = false;
  }

}
