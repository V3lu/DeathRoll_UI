import { Component } from '@angular/core';
import { APIConnectionService } from '../../../Services/apiconnection.service';
import { JwtTokenContainerService } from '../../../Services/jwt-token-container.service';
import { LoggedUserDataService } from '../../../Services/logged-user-data.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, map } from 'rxjs';

@Component({
    selector: 'app-game',
    imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
    templateUrl: './game.component.html',
    styleUrl: './game.component.css'
})
export class GameComponent {

    myForm! : FormGroup;
    constructor(private apiconn : APIConnectionService, private TC : JwtTokenContainerService, private loggedUserData : LoggedUserDataService, private fb : FormBuilder){
        this.myForm = this.fb.group({
            roll: 0
        })
    }

    PlaceRoll(){
        this.apiconn.GamePlaceRoll(this.loggedUserData.LoggedUser.Id, this.myForm.value.roll)
        .pipe(
            map((response) => {
                console.log(response);
                return response;
            })
        ).subscribe();

        this.apiconn.SimilarBetOpponentsEndpoint(this.loggedUserData.LoggedUser.Id, this.myForm.value.roll)
        .pipe(
            map((response) => {
                console.log(response);
                return response;
            }),
            catchError((error) => {
                console.error('Error fetching similar bet opponents:', error);
                return [];
            })
        ).subscribe();
    }

    AcceptRoll(){

    }

    PlayRoll(){
        
    }
}
