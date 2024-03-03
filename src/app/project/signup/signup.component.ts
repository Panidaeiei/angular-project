import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule} from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    FormsModule ,HttpClientModule,RouterLink ,RouterModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor(private http:HttpClient){}

  name:any="";
  email:any="";
  password:any="";
  type:any="use";
  
  
  
  
  
sign_up() {
   let bodyData = {
    "name" : this.name,
    "email" : this.email,
    "password" : this.password,
    "type" : this.type
   };
 this.http.post("http://localhost:3000/register",bodyData).subscribe((result:any)=>{
console.log(result);

 })
}
}
