import { Routes } from '@angular/router';
import { LoginComponent } from './project/login/login.component';
import { SignupComponent } from './project/signup/signup.component';

export const routes: Routes = [
    {path: 'login' , component : LoginComponent},
    {path: '' , component : SignupComponent}
];
