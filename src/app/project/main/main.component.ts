import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Remove unused imports
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpHeaders from @angular/common/http
import { RouterLink, RouterOutlet, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { lastValueFrom } from 'rxjs';
import { CatModel } from '../../model';
import { CatService } from '../../services/api/cat.service';
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';

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
    HttpClientModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [CatService],
})
export class MainComponent {
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
    private service: CatService,
    private http: HttpClient
  ) {
    this.Catdata();
  }

  // แมวสุ่ม
  async Catdata() {
    this.Catresult = await this.service.get();
  }

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
    Swal.fire({
      html: `<div style="display: flex; justify-content: center; margin-top: 40px; margin-bottom: 40px;">
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;  width: 70%; height: auto; background-color: rgb(255, 255, 255);">
         <span style="font-size: 25px;  margin-bottom: 20px;">สูตรการคำนวณ Elo Rating</span>
         <div style="display: flex; flex-direction: row; margin-bottom: 20px;">
              <span style="color: rgb(37, 157, 26);">Score Win : ${win}</span>
              <span style="margin-left: 30px; color: brown;">Score Lose : ${lose}</span>
         </div>
         <span style="font-size: 18px; margin-bottom: 20px;">หาค่า จากคะแนนที่ได้มาข้างต้น คนชนะ=a คนแพ้=b</span>
         <span style="font-size: 18px; color: rgb(37, 157, 26);">ผู้ชนะ</span>
         <span style="font-size: 18px; color: rgb(37, 157, 26);">Ea = 1 / 1 + 10 ^ (${win} - ${lose}) / 400 = ${this.hopewin}</span>
         <span style="font-size: 18px; margin-top: 20px; color: brown;">ผู้แพ้</span>
         <span style="font-size: 18px; color: brown;">Eb = 1 / 1 + 10 ^ (${lose} - ${win}) / 400 = ${this.hopelose}</span>

         <span style="font-size: 18px; margin-top: 20px;">หลังคำนวณคะแนนใหม่จะได้คะแนนใหม่ของผู้ชนะ และผู้แพ้ดังนี้</span>

              <div style="display: flex; flex-direction: column; align-items: center;">
                  <span style="font-size: 18px; margin-top: 20px; color: rgb(37, 157, 26);">ผู้ชนะ</span>
                  <span style="font-size: 18px; color: rgb(37, 157, 26);">Ra = ${win} + 32 (1 + ${this.hopewin}) = ${this.newwin}</span>
              </div>
              <div style="display: flex; flex-direction: column; align-items: center;">
                  <span style="font-size: 18px; margin-top: 20px; color: brown;">ผู้แพ้</span>
                  <span style="font-size: 18px; color: brown; margin-bottom: 20px;">Rb = ${lose} + 32 (0 - ${this.hopelose}) = ${this.newlose}</span>
              </div>
      </div>
  </div>`,
  width: '1000px'
    });
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
