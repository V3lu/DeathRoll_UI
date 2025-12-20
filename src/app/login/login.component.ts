import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { APIConnectionService } from '../../../Services/apiconnection.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-login',
    imports: [FormsModule, ReactiveFormsModule, RouterLink, RouterModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    myForm: FormGroup;
    areCredentialsvalid : boolean = true;
    Login(){
        
    }

    constructor(private apiconn : APIConnectionService, private fb : FormBuilder){
        this.myForm = this.fb.group({
            username: [''],
            password: ['']
        })
    }
}
