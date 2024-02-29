import { Routes } from '@angular/router';
import { LoginComponent } from './project/login/login.component';
import { SignupComponent } from './project/signup/signup.component';
import { MainComponent } from './project/main/main.component';
import { UserComponent } from './project/user/user.component';
import { ProfileUserComponent } from './project/profile-user/profile-user.component';
import { EditProfileuserComponent } from './project/edit-profileuser/edit-profileuser.component';

export const routes: Routes = [
    {path: 'login' , component : LoginComponent},
    {path: 'signup' , component : SignupComponent},
    {path: '' , component : MainComponent},
    {path: 'user', component : UserComponent},
    {path: 'profileuser', component : ProfileUserComponent},
    {path: 'editpro', component : EditProfileuserComponent}
];
