import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { RouterModule} from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-pagetop',
  standalone: true,
  imports: [RouterOutlet,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    MatInputModule,
    HttpClientModule,CommonModule,FormsModule],
  templateUrl: './pagetop.component.html',
  styleUrl: './pagetop.component.scss'
})
export class PagetopComponent {
  Catresult: any;

  
  constructor(private router: Router, private http: HttpClient) {
this.calltop();
  }


calltop(){
   this.http.get('http://localhost:3000/ranktoday').subscribe((result: any) => {
    console.log(result);
    this.Catresult = result;
  });
}
}
 
