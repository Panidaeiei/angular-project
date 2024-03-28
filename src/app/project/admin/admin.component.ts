import { Component, OnInit } from '@angular/core';
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
import { UserIMG, UserModel } from '../../model';
import { AdminService } from '../../services/api/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    HttpClientModule,
    RouterLink,
    
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  userPhoto:UserIMG[]=[];
  
  user: any;
  Userresult: UserModel[] = [];
  avatar: any;

  constructor(private adminService: AdminService,private router:Router
  ) {}
  ngOnInit(): void {
    this.Catdata();
  }

  async viewuser(uid: number) {
    const body ={
      uid:+uid
    }
    this.userPhoto=await this.adminService.getUserIMG(body);
    console.log(this.userPhoto);
    
  }

  async Catdata() {
    this.Userresult = await this.adminService.getProUser();
    console.log(this.Userresult);
    return this.Userresult;
  }

  // profileuser(){
  //   Swal.fire({
  //     html: `
  //     <div style=" display: flex;  flex-direction: column; justify-content: center; align-items: center;">
  //     <div *ngFor="let user of Userresult;"
  //         style=" display: flex; background-color: rgb(217, 215, 215); width: 30%; height: 200px; margin-top: 50px;">
  //         <div style="display: flex; flex-direction: row;">
  //             <a [routerLink]="['/showepro']"><img style="width: 180px; height: 180px; margin-top: 10px; margin-left: 20px;" src="${this.avatar}"
  //                     alt=""></a>
  //             <div style="display: flex; flex-direction: column; font-size: 20px;">
  //                     <p style="margin-left: 30px;">Name : {{ user.name }}</p>
  //                     <span style="margin-left: 30px;">ID : {{ user.id }}</span>
  //             </div>
  //         </div>
  //     </div>
  // </div>` 
  //     ,
  //     width: '900px'
  //   });
  // }

}
