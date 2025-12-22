import { Injectable } from '@angular/core';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserDataService {

  LoggedUser! : User;

  constructor() { }

}
