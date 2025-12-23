import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtTokenContainerService {

  SetToken(token : any){
    sessionStorage.setItem("token", token)
  }

  GetToken(){
    return sessionStorage.getItem("token");
  }
}
