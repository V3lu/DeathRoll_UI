import { Component } from '@angular/core';
import { APIConnectionService } from '../../../Services/apiconnection.service';
import { JwtTokenContainerService } from '../../../Services/jwt-token-container.service';
import { LoggedUserDataService } from '../../../Services/logged-user-data.service';

@Component({
    selector: 'app-game',
    imports: [],
    templateUrl: './game.component.html',
    styleUrl: './game.component.css'
})
export class GameComponent {

    constructor(private apiconn : APIConnectionService, private TC : JwtTokenContainerService, private loggedUserData : LoggedUserDataService){}

    PlaceRoll(){

    }

    AcceptRoll(){

    }

    PlayRoll(){
        
    }
}
