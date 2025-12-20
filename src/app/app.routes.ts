import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FinancesComponent } from './finances/finances.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    {path:'', component:LoginComponent},
    {path:'Register', component:RegisterComponent},
    {path:'Finances', component:FinancesComponent},
    {path:'Game', component:GameComponent}
];
