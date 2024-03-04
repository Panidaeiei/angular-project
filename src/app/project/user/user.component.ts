import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule,Router,RouterLink} from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,HttpClientModule,RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  Catresult:any=[];
  constructor(private router: Router , private http:HttpClient) {
     this.Catdata();
  }

  Catdata() {
    this.http.get(`http://localhost:3000/random`).subscribe((result: any) => {
      console.log(result);
      this.Catresult = result ;
      
    });
  }
  link(){
    this.router.navigate(["/user"]);
  }
}
