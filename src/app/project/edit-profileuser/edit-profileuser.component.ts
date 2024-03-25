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
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edit-profileuser',
  standalone: true,
  imports: [RouterOutlet,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    MatInputModule,HttpClientModule,CommonModule],
  templateUrl: './edit-profileuser.component.html',
  styleUrl: './edit-profileuser.component.scss'
})
export class EditProfileuserComponent implements OnInit{
  constructor(
    private router: Router,   private http: HttpClient,   private service:CatService  ) { }

user:any;
uploadFile: File | null = null;


ngOnInit(): void {
    this.user = this.service.getUserFromLocalStorage(); // ดึงข้อมูลผู้ใช้จาก Local Storage
    return this.user;
  }

  onFileUpdate(event: any, id: any): void {
    this.uploadFile = event.target.files[0];
    console.log('f1',id);
    this.changeImage(id);
  }
  async changeImage(id: any) {
    console.log('user',id);
    if (this.uploadFile) {
      const formData = new FormData();
      formData.append('file', this.uploadFile);
      formData.append('id', id);
      try {
      await this.service.putimgUser(id, formData);
        console.log('Image upload successful');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.warn('No file selected.');
    }
  }
}
