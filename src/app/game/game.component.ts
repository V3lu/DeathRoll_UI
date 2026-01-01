import { Component, signal, Signal } from '@angular/core';
import { APIConnectionService } from '../../../Services/apiconnection.service';
import { JwtTokenContainerService } from '../../../Services/jwt-token-container.service';
import { LoggedUserDataService } from '../../../Services/logged-user-data.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, map, single } from 'rxjs';
import { Roll } from '../../../Models/Roll';

@Component({
    selector: 'app-game',
    imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
    templateUrl: './game.component.html',
    styleUrl: './game.component.css'
})
export class GameComponent {

    filter = signal('');
    similarRolls : Roll[] = [];

    myForm! : FormGroup;
    constructor(private apiconn : APIConnectionService, private TC : JwtTokenContainerService, private loggedUserData : LoggedUserDataService, private fb : FormBuilder){
        this.myForm = this.fb.group({
            roll: 0
        })
    }

    async PlaceRoll(){
        this.apiconn.GamePlaceRoll(this.loggedUserData.LoggedUser.Id, this.myForm.value.roll)
        .pipe(
            map((response) => {
                console.log(response);
                return response;
            })
        ).subscribe();

        this.apiconn.SimilarBetOpponents(this.loggedUserData.LoggedUser.Id, this.myForm.value.roll)
        .pipe(
            map((response) => {
                console.log(response);
                return response;
            })
        ).subscribe({
            next : ((response : any) => {
                this.similarRolls = response.body;
            })
        });

    }

    FilterBets(event : any){
        this.filter.set(event.target.value);
    }

    async AcceptRoll(roll : Roll){
        this.apiconn.AcceptRollChallenge(this.myForm.value.username, roll.Id)
        .pipe(
            map((response) => {
                console.log(response);
                return response;
            }),
            catchError((error) => {
                console.error('Error in AcceptRoll:', error);
                throw error;
            })
        ).subscribe({
            next : ((response : any) => {
                console.log(response)
            }),
        });
    }

    PlayRoll(){
        
    }
}
