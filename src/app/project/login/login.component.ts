import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../service.service';
import { CatModel } from '../../model';
import { CatService } from '../../services/api/cat.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    RouterLink,
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  cat: CatModel[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private service: ServiceService,
    private catService:CatService
  ) {}

  name: any = '';
  password: any = '';



  check() {
    let queryParams = `?name=${encodeURIComponent(this.name)}&password=${encodeURIComponent(this.password)}`;

    this.http.get(`https://catapirender.onrender.com${queryParams}`).subscribe((result: any) => {
      console.log(result);
      if (result.length > 0) {
        const user = result[0]; // Assuming the user data is the first element in the array
        this.service.setUserData(user); // Set user data in the service
        this.router.navigate(['/user']);
      }
    });
  }

  GetId() {
    this.http.get(`https://catapirender.onrender.com/random/id`).subscribe((result: any) => {
      console.log(result);
      // Handle the result as needed
    });
  }
}

