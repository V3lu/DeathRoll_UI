import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { APIConnectionService } from '../../../Services/apiconnection.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map } from 'rxjs';


@Component({
    selector: 'app-login',
    imports: [FormsModule, ReactiveFormsModule, RouterLink, RouterModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    myForm: FormGroup;
    areCredentialsvalid : boolean = true;

    constructor(private apiconn : APIConnectionService, private fb : FormBuilder){
        this.myForm = this.fb.group({
            username: [''],
            password: ['']
        })
    }

    Login(){
        this.apiconn.login(this.myForm.value.username, this.myForm.value.password)
        .pipe(
            catchError(error => {
                console.log(error);
                return throwError(() => error)
            }),
            map((response) => {
                console.log(response);
                return response
            })
        )
        .subscribe((response) => {
            console.log(response + ": Subscribed");
        })
    }
}
