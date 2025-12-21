import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtTokenContainerService } from './jwt-token-container.service';

@Injectable({
  providedIn: 'root',
})
export class APIConnectionService {

  loginEndpoint = "http://localhost:8080/Auth/Login";
  registerEndpoint = "http://localhost:8080/Auth/Register";
  CheckEmailViabilityEndpoint = "http://localhost:8080/Auth/CheckEmailViability";
  CheckUsernameViabilityEndpoint = "http://localhost:8080/Auth/CheckUsernameViability";

  constructor(private http : HttpClient, private tokenContainer : JwtTokenContainerService){}

  login(username : string, hashedPassword : string){
    return this.http.post<any>(this.loginEndpoint, {username, hashedPassword}, {observe: 'response'});
  }

  register(username : string, hashedPassword : string, email : string){
    return this.http.post<any>(this.registerEndpoint, {username, hashedPassword, email}, {observe: 'response'});
  }

  CheckUsernameViability(username : string){
    return this.http.post<any>(this.CheckUsernameViabilityEndpoint, {username}, {observe: 'response'});
  }

  CheckEmailViability(email : string){
    return this.http.post<any>(this.CheckEmailViabilityEndpoint, {email}, {observe: 'response'});
  }






}
