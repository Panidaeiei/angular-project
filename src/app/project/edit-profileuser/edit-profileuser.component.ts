import { Component,OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { RouterModule} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CatService } from '../../services/api/cat.service';
@Component({
  selector: 'app-edit-profileuser',
  standalone: true,
  imports: [RouterOutlet,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    MatInputModule],
  templateUrl: './edit-profileuser.component.html',
  styleUrl: './edit-profileuser.component.scss'
})
export class EditProfileuserComponent implements OnInit{
  constructor(
    private router: Router,   private http: HttpClient,   private service:CatService  ) { }

user:any;


ngOnInit(): void {
    this.user = this.service.getUserFromLocalStorage(); // ดึงข้อมูลผู้ใช้จาก Local Storage
    return this.user;
  }
}
