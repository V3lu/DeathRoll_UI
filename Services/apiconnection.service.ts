import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtTokenContainerService } from './jwt-token-container.service';

@Injectable({
  providedIn: 'root',
})
export class APIConnectionService {

  loginEndpoint = "http://localhost:8080/Auth/Login";

  constructor(private http : HttpClient, private tokenContainer : JwtTokenContainerService){}

  login(username : string, hashedPassword : string){
    return this.http.post<any>(this.loginEndpoint, {username, hashedPassword}, {observe: 'response'});
  }
}
