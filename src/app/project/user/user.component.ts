import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Router, RouterLink } from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CatModel } from '../../model';
import { ServiceService } from '../../service.service';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    HttpClientModule,
    RouterLink,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  Catresult: any = [];
  user: any = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    private service: ServiceService
  ) {
    this.Catdata();
  }

  Catdata() {
    this.http.get(`http://localhost:3000/random`).subscribe((result: any) => {
      console.log(result);
      this.Catresult = result;
    });
  }

  ngOnInit() {
    this.service.userData$.subscribe((userData) => {
      console.log('userdata', userData); // Use the userData as needed in your component
      this.user = userData;
    });
  }

  link() {
    this.router.navigate(['/user']);
  }
  k: any = 32;
  win: number = 0;
  lose: number = 0;
  truevaluewin: number = 0;
  truevaluelose: number = 0;
  hopewin: number = 0;
  hopelose: number = 0;
  newwin: number = 0;
  newlose: number = 0;

  // Define headers here
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  async find(id: any, id2: any) {
    const catID = id;
    const catID2 = id2;
    const url = `http://localhost:3000/upscore/${catID}`;
    const data = await lastValueFrom(this.http.get(url));
    const url2 = `http://localhost:3000/upscore/${catID2}`;
    let data2 = await lastValueFrom(this.http.get(url2));
    // this.win = JSON.stringify(data);
    let win = data as CatModel[];
    let lose = data2 as CatModel[];

    // this.http.get(`http://localhost:3000/upscore/${catID}`).subscribe((result: any) => {
    //   this.win = result[0]?.score;
    //   console.log(this.win);
    // });
    // this.http.get(`http://localhost:3000/upscore/${catID2}`).subscribe((result: any) => {
    //   this.lose = result[0]?.score;
    //   console.log(this.lose);
    // });
    this.calculateEloRating(id, id2, win[0].score, lose[0].score);
    this.Catdata();
  }

  calculateEloRating(id: any, id2: any, win: any, lose: any) {
    //elo algorihtm
    // Calculate the expected win probability for the winner (always 1)
    this.truevaluewin = 1;
    this.hopewin = 1 / (1 + 10 ** (-(win - lose) / 400));
    this.newwin = win + this.k * (this.truevaluewin - this.hopewin);
    console.log('oldWin', win);
    console.log('newWin', this.newwin);

    //elo algorihtm
    this.truevaluelose = 0;
    this.hopelose = 1 / (1 + 10 ** (-(win - lose) / 400));
    this.newlose = lose + this.k * (this.truevaluelose - this.hopelose);
    console.log('oldlose', lose);
    console.log('newlose', this.newlose);

    this.http
      .put(
        `http://localhost:3000/upscore/${id}`,
        { score: this.newwin },
        { headers: this.headers }
      )
      .subscribe((result: any) => {});

    this.http
      .put(
        `http://localhost:3000/upscore/${id2}`,
        { score: this.newlose },
        { headers: this.headers }
      )
      .subscribe((result: any) => {});

    this.win = win;
    this.lose = lose;
  }
}
