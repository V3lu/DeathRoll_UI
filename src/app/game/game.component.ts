import { Component, signal } from '@angular/core';
import { APIConnectionService } from '../../../Services/apiconnection.service';
import { JwtTokenContainerService } from '../../../Services/jwt-token-container.service';
import { LoggedUserDataService } from '../../../Services/logged-user-data.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, concatMap, map } from 'rxjs';

@Component({
    selector: 'app-game',
    imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
    templateUrl: './game.component.html',
    styleUrl: './game.component.css'
})
export class GameComponent {

    filter = signal('');
    similarRolls : any;
    curentOpponentUsername : string = '';

    myForm! : FormGroup;
    constructor(private apiconn : APIConnectionService, private TC : JwtTokenContainerService, private loggedUserData : LoggedUserDataService, private fb : FormBuilder){
        this.myForm = this.fb.group({
            roll: 0
        })
    }

    async PlaceRoll() {
        const rollValue = this.myForm.value.roll;
        const userId = this.loggedUserData.LoggedUser.Id;

        this.apiconn.GamePlaceRoll(userId, rollValue)
        .pipe(
            concatMap((PlaceRollResponse) => {
                console.log('Roll placed');
                return this.apiconn.SimilarBetOpponents(userId, rollValue);
            })
        ).subscribe({
            next: (SimilarBetsResponse => {
                this.similarRolls = SimilarBetsResponse.body;
            }),
            error: (error) => {
                console.error('Error fetching similar bets:', error);
            }
        })
    }

    async PlaceSubsequentRoll() {
        const userId = this.loggedUserData.LoggedUser.Id;

        this.apiconn.GamePlaceRoll(userId, this.myForm.value.roll)
        .pipe(
            concatMap((PlaceRollResponse) => {
                console.log('Roll placed');
                return this.apiconn.SimilarBetOpponents(userId, this.myForm.value.roll);
            })
        ).subscribe({
            next: (SimilarBetsResponse => {
                this.similarRolls = SimilarBetsResponse.body;
            }),
            error: (error) => {
                console.error('Error fetching similar bets:', error);
            }
        })
    }

    FilterBets(event : any): void{
        this.filter.set(event.target.value);
    }

    AcceptRoll(roll : any): void{
        this.curentOpponentUsername = roll.username;
        this.TriggerInGameStatusForBothPlayers(this.loggedUserData.LoggedUser.Username!, roll.username);
        this.apiconn.GetOpponentData(roll.username)
        .pipe(
            map((response) => {
                return response;
            }),
            catchError((error) => {
                console.error('Error in GetOpponentData:', error);
                throw error;
            })
        ).subscribe({
            next : ((response : any) => {
                console.log(response)
            }),
        });
    }

    TriggerInGameStatusForBothPlayers(username1 : string, username2 : string): void {
        this.apiconn.EnableInGameState(username1)
        .pipe(
            map((response) => {
                return response;
            }),
            catchError((error) => {
                console.error('Error in TriggerInGameStatusForBothPlayers:', error);
                throw error;
            })
        ).subscribe({
            next : ((response : any) => {
                console.log(response)
            }),
        });

        this.apiconn.EnableInGameState(username2)
        .pipe(
            map((response) => {
                return response;
            }),
            catchError((error) => {
                console.error('Error in TriggerInGameStatusForBothPlayers:', error);
                throw error;
            })
        ).subscribe({
            next : ((response : any) => {
                console.log(response)
            }),
        });

        this.switchVis2();
    }

    switchVis2(){
        var item = document.getElementById('modal2')?.className;
        if(item == "modal"){
        document.getElementById('modal2')?.setAttribute("class", "modal is-active");
        }
        else{
        document.getElementById('modal2')?.setAttribute("class", "modal");
        }
    }
}
