import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtTokenContainerService } from './jwt-token-container.service';

@Injectable({
  providedIn: 'root',
})
export class APIConnectionService {

  constructor(private http : HttpClient, private tokenContainer : JwtTokenContainerService){}

  
}
