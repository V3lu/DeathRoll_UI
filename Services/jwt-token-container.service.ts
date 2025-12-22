import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtTokenContainerService {
  
  token : string = "";

  SetToken(token : any){
    this.token = token
  }

  GetToken(){
    return this.token;
  }
}
