import { Injectable } from '@angular/core';
import { UserInput } from 'src/app/interfaces/user';



@Injectable({
  providedIn: 'root'
})
export class SlideSearchUserService {
  
  constructor() { }
  
  getMock() :UserInput {
    return {
        id: '',
        password: '',
        lastname: '',
        firstname: '',
        age: ''
    }
  }
  private userResearch : UserInput = this.getMock();

  resetSearch():void {
    this.userResearch = this.getMock();
  }

  researchIsEqualToMock():boolean {
    return JSON.stringify(this.userResearch)===JSON.stringify(this.getMock());
  }

  
  filteredUserResearch(users : UserInput[]):UserInput[]{
    let displayedUsers : UserInput[] = [];
    if(this.researchIsEqualToMock())displayedUsers=users;
    else {
        displayedUsers = users.filter((user)=>{
        const constatId = (user.id == this.userResearch.id) || this.userResearch.id==''
        const constatAge = (user.age == this.userResearch.age) || this.userResearch.age=='';
        const constatFirstname = this.userResearch.firstname.length==0 || user.firstname.includes(this.userResearch.firstname) 
        const constatLastname = this.userResearch.lastname.length==0 || user.lastname.includes(this.userResearch.lastname) 
        const constat = constatId && constatAge && constatFirstname && constatLastname;
        return constat;
      })
    }
    return displayedUsers;
  }

  getUserResearch():UserInput{
    return this.userResearch;
  }

  setUserResearch(user : UserInput):void {
    this.userResearch = user;
  }
}
