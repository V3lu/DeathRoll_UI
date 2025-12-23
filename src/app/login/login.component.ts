import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { APIConnectionService } from '../../../Services/apiconnection.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map } from 'rxjs';
import { JwtTokenContainerService } from '../../../Services/jwt-token-container.service';
import { LoggedUserDataService } from '../../../Services/logged-user-data.service';
import { User } from '../../../Models/User';


@Component({
    selector: 'app-login',
    imports: [FormsModule, ReactiveFormsModule, RouterLink, RouterModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    myForm: FormGroup;
    areCredentialsInvalid : boolean = true;

    constructor(private apiconn : APIConnectionService, private fb : FormBuilder, private TS : JwtTokenContainerService, private loggedUserData : LoggedUserDataService){
        this.myForm = this.fb.group({
            username: [''],
            password: ['']
        })
    }

    Login(){
        this.apiconn.login(this.myForm.value.username, this.myForm.value.password)
        .pipe(
            catchError(error => {
                this.areCredentialsInvalid = true;
                return throwError(() => error)
            }),
            map((response) => {
                console.log(response);
                return response
            })
        )
        .subscribe({
            next: ((response : any) => {
                this.TS.SetToken(response.body.token);
                this.areCredentialsInvalid = false;
                const user : User = {
                    Id: response.body.user.id,
                    Username: response.body.user.username,
                    Email: response.body.user.email,
                    Gold: response.body.user.gold,
                    Dollars: response.body.user.dollars,
                    createdAt: response.body.user.createdAt,
                    Rolls: response.body.user.rolls,
                }
                this.loggedUserData.LoggedUser = user;
                console.log(this.loggedUserData.LoggedUser);
            })
        })
    }
}
