import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoggedUserDataService } from '../../Services/logged-user-data.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DeathRoll_UI';

  constructor(public loggedUserData : LoggedUserDataService){
    
  }
}
