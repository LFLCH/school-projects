import { Component,OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
  typed_login : string = '';
  password : string ='';
  hide : boolean = true;
  iswrong = false;

  constructor(
    private api : ApiHelperService,
    private tokenStorageService: TokenStorageService,
    private router : Router,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
  }
  
  login(): void {
    const username: string = this.typed_login;
    const password: string = this.password;
    this.api.post({endpoint: '/auth/login', data: { username, password }}).then(response => {
      this.tokenStorageService.save(response);
      if(this.tokenStorageService.isLogged()){
        this.router.navigateByUrl('');
        this.closeSnackBar();
      }
    }
    ).catch(error=>{
      this.iswrong=true;
      this.openSnackBar();
    })
  }
  
  openSnackBar() {
    const verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    this.snackBar.open('Identifiant / mot de passe incorrect', 'Réessayer', {
      verticalPosition: verticalPosition,
    });
  }

  closeSnackBar(){
    this.snackBar.dismiss();
  }
}
