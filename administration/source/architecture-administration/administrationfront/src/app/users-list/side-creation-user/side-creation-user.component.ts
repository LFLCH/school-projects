import { Component, EventEmitter, Output } from '@angular/core';
import { UserInput } from 'src/app/interfaces/user';

@Component({
  selector: 'app-side-creation-user',
  templateUrl: './side-creation-user.component.html',
  styleUrls: ["../../app.component.scss"]
})
export class SideCreationUserComponent {
  @Output()  creation = new EventEmitter<UserInput>();

  newUser : UserInput = {
    id: 0,
    password: '',
    lastname: '',
    firstname: '',
    age: undefined
  }


  ngOnInit(): void {
    this.newUser = {
      id:        1,
      password:  '',
      lastname:  "",
      firstname: "",
      age:       undefined
    }
  }


  ready():boolean{
    return this.newUser.firstname.length>0 && this.newUser.password.length>0 && this.newUser.lastname.length>0 && this.newUser.age!==undefined;
  }

  validation():void{
    this.creation.emit(this.newUser);
    this.resetCreation();
  }

  resetCreation():void {
    this.newUser =  {
      id: 0,
      password: '',
      lastname: '',
      firstname: '',
      age: undefined
    }
  }
}
