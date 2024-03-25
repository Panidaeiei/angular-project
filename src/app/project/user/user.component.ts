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
import { CatService } from '../../services/api/cat.service';
import { CommonModule } from '@angular/common';
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
    CommonModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  user: any = [];
  k: any = 32;
  win: number = 0;
  lose: number = 0;
  truevaluewin: number = 0;
  truevaluelose: number = 0;
  hopewin: number = 0;
  hopelose: number = 0;
  newwin: number = 0;
  newlose: number = 0;
  Catresult: CatModel[] = [];
  date: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private service2: ServiceService,
    private service: CatService
  ) {
    this.Catdata();
  }

  async Catdata() {
    this.Catresult = await this.service.get();
  }

  ngOnInit() {
    this.service2.userData$.subscribe((userData) => {
      console.log('userdata', userData); // Use the userData as needed in your component
      this.user = userData;
    });
  }

  link() {
    this.router.navigate(['/user']);
  }

  // Define headers here
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  async find(id: any, id2: any) {
    const catID = id;
    const catID2 = id2;
    console.log('id', id);
    try {
      const data = await this.service.SelectScore(catID);
      const data2 = await this.service.SelectScore(catID2);
      console.log('data', data);
      if (!data || !data2) {
        console.error('Failed to fetch scores for cats.');
        return; // Exit function if scores are not fetched successfully
      }

      const scoreWin = data[0].score;
      const scoreLose = data2[0].score;

      this.calculateEloRating(id, id2, scoreWin, scoreLose);
    } catch (error) {
      console.error('Error fetching/updating scores:', error);
      // Handle error gracefully
    }

    this.Catdata();
  }

  async calculateEloRating(id: any, id2: any, win: any, lose: any) {
    //elo algorihtm
    // Calculate the expected win probability for the winner (always 1)
    this.truevaluewin = 1;
    this.hopewin = 1 / (1 + 10 ** (-(win - lose) / 400));
    this.newwin = win + this.k * (this.truevaluewin + this.hopewin);
    console.log('oldWin', win);
    console.log('newWin', this.newwin);

    //elo algorihtm
    this.truevaluelose = 0;
    this.hopelose = 1 / (1 + 10 ** (-(lose - win) / 400));
    this.newlose = lose + this.k * (this.truevaluelose - this.hopelose);
    console.log('oldlose', lose);
    console.log('newlose', this.newlose);

    await this.service.put(id, this.newwin);
    await this.service.put(id2, this.newlose);

    this.upwin(id, win);
    this.uplose(id2, lose);
    this.win = win;
    this.lose = lose;
  }

  async upwin(id: any, win: any) {
    console.log('up is working');
    const bodyData = {
      cid: id,
      score_old: win,
      score_new: this.newwin,
      date: this.date,
    };

    try {
      await this.service.updateScore(bodyData);
      console.log('Vote updated successfully');
    } catch (error) {
      console.error('Error updating vote:', error);
      // Handle error gracefully
    }
  }
  async uplose(id: any, lose: any) {
    console.log('uplose is working');
    let bodyData = {
      cid: id,
      score_old: lose,
      score_new: this.newlose,
      date: this.date,
    };
    try {
      await this.service.updateScore(bodyData);
      console.log('Vote updated successfully');
    } catch (error) {
      console.error('Error updating vote:', error);
      // Handle error gracefully
    }
  }
}
