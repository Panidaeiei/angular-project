import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Remove unused imports
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';  // Import HttpHeaders from @angular/common/http
import { RouterLink, RouterOutlet,RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    HttpClientModule,RouterLink
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  k: any = 32;
  win: any;
  lose: number = 0;
  truevaluewin: number = 0;
  truevaluelose: number = 0;
  hopewin: number = 0;
  hopelose: number = 0;
  newwin: number = 0;
  newlose: number = 0;
  Catresult: any = [];

  // Define headers here
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private router: Router, private http: HttpClient) {
    this.Catdata();
  }

  Catdata() {
    this.http.get('http://localhost:3000/random').subscribe((result: any) => {
      console.log(result);
      this.Catresult = result;
    });
  }

  find(id: any, id2: any) {
    const catID = id;
    const catID2 = id2;
    this.http.get(`http://localhost:3000/upscore/${catID}`).subscribe((result: any) => {
      this.win = result;
      console.log("re1"+this.win);
    });
    this.http.get(`http://localhost:3000/upscore/${catID2}`).subscribe((result: any) => {
      this.lose = result.score;
      console.log(result);
    });
    return;
  }

  calculateEloRating(id: any, id2: any) {
    //elo algorihtm
 // Calculate the expected win probability for the winner (always 1)
this.truevaluewin = 1;
this.hopewin = 1 / (1 + 10**(- (this.win - this.lose) / 400));
this.newwin = this.win + this.k * (this.truevaluewin - this.hopewin);
console.log("New score for winner:", this.newwin);


    //elo algorihtm
    this.truevaluelose = 0;
    this.hopelose = 1 / (1 + 10**(- (this.win - this.lose) / 400));
    this.newlose = this.lose + this.k * (this.truevaluelose - this.hopelose);
    console.log(this.newlose);



    this.http.put(`http://localhost:3000/upscore/${id}`, { score: this.newwin }, { headers: this.headers })
      .subscribe((result: any) => {});

    this.http.put(`http://localhost:3000/upscore/${id2}`, { score: this.newlose }, { headers: this.headers })
      .subscribe((result: any) => {});
  }
}
