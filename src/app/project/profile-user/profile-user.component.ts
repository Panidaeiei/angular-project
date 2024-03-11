import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule,Router,RouterLink} from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { ServiceService } from '../../service.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [RouterOutlet,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    HttpClientModule],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss'
})
export class ProfileUserComponent {
  user:any=[];
  constructor(private router: Router , private http:HttpClient,private service:ServiceService) {}
  ngOnInit() {
    this.service.userData$.subscribe((userData) => {
      console.log('userdata',userData); // Use the userData as needed in your component
      this.user = userData ;
    });
  }
}
