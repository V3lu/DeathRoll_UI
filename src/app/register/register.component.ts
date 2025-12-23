import { CommonModule } from '@angular/common';
import { Component, signal, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APIConnectionService } from '../../../Services/apiconnection.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { catchError, map, throwError } from 'rxjs';
import { LoggedUserDataService } from '../../../Services/logged-user-data.service';
import { JwtTokenContainerService } from '../../../Services/jwt-token-container.service';
import { User } from '../../../Models/User';

@Component({
    selector: 'app-register',
    imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    isUsernameProper : boolean = true;
    isEmailProper : boolean = true;
    isPasswordProper : boolean = true;

    passwordIcon : boolean = false;
    emailIcon : boolean = false;
    nameIcon : boolean = false;

    nameSignal = signal('');
    emailSignal = signal('');
    passwordSignal = signal('');

    registerForm : FormGroup;

    constructor(private apiconn : APIConnectionService, private fb : FormBuilder, private TS : JwtTokenContainerService, private loggedUserData : LoggedUserDataService){
        this.registerForm = this.fb.group({
            Name : [''],
            Email : [''],
            Password : ['']
        })
    }

    Register(event : Event){
        event.preventDefault();
        this.apiconn.register(this.registerForm.value.Name, this.registerForm.value.Email, this.registerForm.value.Password)
        .pipe(
            catchError(error => {
                if (error.status === 404) {

                }
                return throwError(() => new Error("Error occured"));
            }),
            map((response) => {
                const data = response.body;
                return{data};
            })
        ).subscribe({
            next: ((data : any) => {
                this.TS.SetToken(data.data.token);
                const user : User = {
                    Id: data.data.user.id,
                    Username: data.data.user.username,
                    Email: data.data.user.email,
                    Gold: data.data.user.gold,
                    Dollars: data.data.user.dollars,
                    createdAt: data.data.user.createdAt,
                    Rolls: data.data.user.rolls,
                }
                this.loggedUserData.LoggedUser = user;
            })
        })
    }

    assignUsername(event : Event){
        const value = (event.target as HTMLInputElement).value;
        this.nameSignal.set(value);

        if (this.nameSignal().length > 0){
            this.apiconn.CheckUsernameViability(this.nameSignal())
            .pipe(
                map((response) => {
                    console.log(response);
                    return {response}
                }),
                catchError((err) => {
                    if (err.status == 409){
                        this.isUsernameProper = false;
                        document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
                        this.nameIcon = false;
                    }
                    return throwError(() => new Error(err));
                })
            ).subscribe({
                next: ((response) => {
                    this.isUsernameProper = true;
                    this.tryUnlockSubmitButton();
                    this.nameIcon = true;
                })
            })
        }
        else{
            this.isUsernameProper = true;
            document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
            this.nameIcon = false;
        }
    }

    assignEmail(event : Event){
        const value = (event.target as HTMLInputElement).value;
        this.emailSignal.set(value);

        if (this.emailSignal().length > 0){
            this.apiconn.CheckEmailViability(this.emailSignal())
            .pipe(
                map((response) => {
                    console.log(response);
                    return {response}
                }),
                catchError((err) => {
                    if (err.status == 409){
                        this.isEmailProper = false;
                        document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
                        this.emailIcon = false;
                    }
                    return throwError(() => new Error(err));
                })
            ).subscribe({
                next: ((response) => {
                    this.isEmailProper = true;
                    this.tryUnlockSubmitButton();
                    this.emailIcon = true;
                })
            })
        }
        else{
            this.isEmailProper = true;
            document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
            this.emailIcon = false;
        }
    }

    assignPassword(event : Event){
        const value = (event.target as HTMLInputElement).value;
        this.passwordSignal.set(value);

        const valueSignal = this.passwordSignal();
        const hasNumber = valueSignal.match("[0-9]+");
        const hasSpecialChar = valueSignal.match("[^A-Za-z0-9]");

        if(valueSignal.length < 8 || hasNumber?.length == null || hasSpecialChar?.length == null){
            this.passwordIcon = false;
            this.isPasswordProper = false;
            document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
        }

        if(valueSignal.length >= 8 && hasNumber?.length != null && hasSpecialChar?.length != null){
            this.passwordIcon = true;
            this.isPasswordProper = true;
            this.tryUnlockSubmitButton();
        }
    }

    tryUnlockSubmitButton(){
        if (this.passwordSignal() != '' && this.emailSignal() != '' && this.nameSignal() != ''){
            if(this.isEmailProper && this.isPasswordProper && this.isUsernameProper){
                document.getElementById("btnsub")?.removeAttribute('disabled');
            }
        }
        else{
            document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
        }
    }

}
