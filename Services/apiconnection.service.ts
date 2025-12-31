import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtTokenContainerService } from './jwt-token-container.service';

@Injectable({
  providedIn: 'root',
})
export class APIConnectionService {

  loginEndpoint = "http://localhost:8080/Auth/Login";
  registerEndpoint = "http://localhost:8080/Auth/Register";
  checkEmailViabilityEndpoint = "http://localhost:8080/Auth/CheckEmailViability";
  checkUsernameViabilityEndpoint = "http://localhost:8080/Auth/CheckUsernameViability";
  gamePlaceRollEndpoint = "http://localhost:8080/Game/PlaceRoll";
  similarBetOpponentsEndpoint = "http://localhost:8080/Game/SimilarBetOpponents";

  constructor(private http : HttpClient, private TS : JwtTokenContainerService){}

  login(username : string, hashedPassword : string){
    return this.http.post<any>(this.loginEndpoint, {username, hashedPassword}, {observe: 'response'});
  }

  register(username : string, hashedPassword : string, email : string){
    return this.http.post<any>(this.registerEndpoint, {username, hashedPassword, email}, {observe: 'response'});
  }

  CheckUsernameViability(username : string){
    return this.http.post<any>(this.checkUsernameViabilityEndpoint, {username}, {observe: 'response'});
  }

  CheckEmailViability(email : string){
    return this.http.post<any>(this.checkEmailViabilityEndpoint, {email}, {observe: 'response'});
  }

  GamePlaceRoll(userId : any, rollBase : any){
    const token = this.TS.GetToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.gamePlaceRollEndpoint, {userId, rollBase}, {observe: 'response', headers: headers })
  }

  SimilarBetOpponents(userId : any, rollBase : any){
    const token = this.TS.GetToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.similarBetOpponentsEndpoint, {userId, rollBase}, {observe: 'response', headers: headers });
  }






}
