import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtTokenContainerService {
  
  token : string = "";

  SetToken(token : string){
    this.token = token
  }

  GetToken(){
    return this.token;
  }
}
