import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-editimg',
  standalone: true,
  imports: [RouterOutlet,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,],
  templateUrl: './editimg.component.html',
  styleUrl: './editimg.component.scss'
})
export class EditimgComponent {
  user:any=[];
  constructor(private router: Router , private http:HttpClient,private service:ServiceService) {}
  ngOnInit() {
    const cachedUserData = localStorage.getItem('userData');
    if (cachedUserData) {
      this.user = JSON.parse(cachedUserData);
    } else {
      this.service.userData$.subscribe((userData) => {
        this.user = userData;
        localStorage.setItem('userData', JSON.stringify(userData));
      });
    }
  }
}
