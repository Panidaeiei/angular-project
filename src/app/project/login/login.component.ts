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
  constructor(private http: HttpClient, private router: Router) {}

  name: any = '';
  password: any = '';
  resultCheck = false;

  check() {
    let queryParams = `?name=${encodeURIComponent(
      this.name
    )}&password=${encodeURIComponent(this.password)}`;

    this.http
      .get(`http://localhost:3000${queryParams}`)
      .subscribe((result: any) => {
        console.log(result);
        if (result.length > 0) {
          this.router.navigate(['/user']);
        }
      });
  }
}
