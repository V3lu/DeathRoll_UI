import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { APIConnectionService } from '../../../Services/apiconnection.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map } from 'rxjs';
import { JwtTokenContainerService } from '../../../Services/jwt-token-container.service';
import { LoggedUserDataService } from '../../../Services/logged-user-data.service';
import { User } from '../../../Models/User';
import { Roll } from '../../../Models/Roll';


@Component({
    selector: 'app-login',
    imports: [FormsModule, ReactiveFormsModule, RouterLink, RouterModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    myForm: FormGroup;
    areCredentialsInvalid : boolean = true;

    constructor(private apiconn : APIConnectionService, private router : Router, private fb : FormBuilder, private TS : JwtTokenContainerService, private loggedUserData : LoggedUserDataService){
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
                return response;
            })
        )
        .subscribe({
            next: ((response : any) => {
                this.TS.SetToken(response.body.token);
                this.areCredentialsInvalid = false;
                const user : User = {
                    Id: response.body.userDTO.id,
                    Username: response.body.userDTO.username,
                    Gold: response.body.userDTO.gold,
                    Dollars: response.body.userDTO.dollars,
                    createdAt: response.body.userDTO.createdAt,
                    Rolls: response.body.userDTO.rolls,
                }
                this.loggedUserData.LoggedUser = user;
                this.router.navigate(['/Game']);
                console.log(this.loggedUserData.LoggedUser);
            })
        })
    }
}
