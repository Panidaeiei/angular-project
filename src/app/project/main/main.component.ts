import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Remove unused imports
import { HttpClient, HttpHeaders,HttpClientModule } from '@angular/common/http';  // Import HttpHeaders from @angular/common/http
import { RouterLink, RouterOutlet,RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { lastValueFrom } from 'rxjs';
import { CatModel } from '../../model';
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
  win: number = 0;
  lose: number = 0;
  truevaluewin: number = 0;
  truevaluelose: number = 0;
  hopewin: number = 0;
  hopelose: number = 0;
  newwin: number = 0;
  newlose: number = 0;
  Catresult: any = [];
  date: any ;
  // Define headers here
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private router: Router, private http: HttpClient) {
    // const date = new Date();
    // // ปรับ timezone เป็นไทย
    // date.setHours(date.getHours() + 7);
    // this.date = date;
    
    this.Catdata();
  }

  Catdata() {
    this.http.get('https://catapirender.onrender.com/random').subscribe((result: any) => {
      console.log(result);
      this.Catresult = result;
    });
  }

 async find(id: any, id2: any){
    const catID = id;
    const catID2 = id2;
    const url = `https://catapirender.onrender.com/upscore/${catID}`;
    const data = await lastValueFrom(this.http.get(url));
    const url2 = `https://catapirender.onrender.com/upscore/${catID2}`;
    let data2 = await lastValueFrom(this.http.get(url2));
    // this.win = JSON.stringify(data);
     let  win = data as  CatModel[];
     let  lose = data2 as  CatModel[];
    
    this.calculateEloRating(id,id2,win[0].score,lose[0].score);
    this.Catdata();
  }

  calculateEloRating(id: any, id2: any,win:any,lose:any) {
    //elo algorihtm
 // Calculate the expected win probability for the winner (always 1)
this.truevaluewin = 1;
this.hopewin = 1 / (1 + 10**(- (win - lose) / 400));
this.newwin = win+ (this.k * (this.truevaluewin + this.hopewin));
console.log("oldWin",win);
console.log("newWin",this.newwin);


    //elo algorihtm
    this.truevaluelose = 0;
    this.hopelose = 1 / (1 + 10**(- (lose - win) / 400));
    this.newlose = lose + (this.k * (this.truevaluelose - this.hopelose));
    console.log("oldlose",lose);
    console.log("newlose",this.newlose);



    this.http.put(`https://catapirender.onrender.com/upscore/${id}`, { score: this.newwin }, { headers: this.headers })
      .subscribe((result: any) => {});

    this.http.put(`https://catapirender.onrender.com/upscore/${id2}`, { score: this.newlose }, { headers: this.headers })
      .subscribe((result: any) => {});

//insert to vote
this.upwin(id,win);
this.uplose(id2,lose);
this.win=win;
this.lose=lose;
 }
upwin(id:any, win :any){
  console.log("up is working");
    let bodyData = {
     "cid" : id,
     "score_old" : win,
     "score_new" : this.newwin,
     "date" : this.date
    };
  this.http.post("https://catapirender.onrender.com/upscore",bodyData).subscribe((result:any)=>{
 console.log('vote update =',result);
 
  });
}
uplose(id:any,lose : any){
  console.log("uplose is working");
    let bodyData = {
     "cid" : id,
     "score_old" : lose,
     "score_new" : this.newlose,
     "date" : this.date
    };
  this.http.post("https://catapirender.onrender.com/upscore",bodyData).subscribe((result:any)=>{
 console.log('vote update =',result);
 
  });
}
}
