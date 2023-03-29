import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersServiceService } from 'src/users/users.service.service';

export interface TokenInfo {
    username: string;
    iat:      number;
    exp:      number;
}


@Injectable()
export class AccountService {

    constructor(
        private userService:UsersServiceService,
        private jwtService:JwtService
    ){}


    password( token : string, new_password : string){
        return new Promise<any>(res=>{
            try{
                const infos : TokenInfo =  this.jwtService.decode(token) as TokenInfo
                this.userService.getSpecificUser(+infos.username).then(user=>{
                    this.userService.hash(new_password).then(hash=>{
                        this.userService.setSpecificUser(user.id,user.firstname,user.lastname,user.age,hash).then((newuser)=>{
                            res(newuser) 
                        })
                    })
                })
            }
            catch(error : any){
                console.log(error)
                res({error:"Password change failed"});
            }
        })
    }
}
