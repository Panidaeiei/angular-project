import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule,Router,RouterLink } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { ServiceService } from '../../service.service';
import { HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CatModel } from '../../model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [RouterOutlet,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    HttpClientModule,
    RouterLink,
    CommonModule,
    
   ],
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent {
  
  img:any=[];
  user:any=[];
  constructor(private router: Router , private http:HttpClient,private service:ServiceService) {
      
  }
  ngOnInit() {
    this.service.userData$.subscribe((userData) => {
      console.log('userdata', userData); 
      this.user = userData;
    });
    // const cachedUserData = localStorage.getItem('userData');
    // if (cachedUserData) {
    //   this.user = JSON.parse(cachedUserData);
    //   this.getimg(this.user.id);
    //   console.log(this.user.id);
    //   }
    //  else {
    //   this.service.userData$.subscribe((userData) => {
    //     this.user = userData;
    //     localStorage.setItem('userData', JSON.stringify(userData));
    //     this.getimg(this.user.id);
    //   });
    // }
  
  }
  uploadFile: File | null = null;
  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  onFileUpdate(event: any, id: any): void {
    this.uploadFile = event.target.files[0];
    console.log('f1',id);
    this.changeImage(id);
  }
  async changeImage(id : any) {
    if (this.uploadFile) {
      const formData = new FormData();
      formData.append('file', this.uploadFile);
      formData.append('id', id);
      console.log('f2',id);
      try {
        const response = await this.http.put<any>('http://localhost:3000/upload/img2', formData).toPromise();
        
        console.log('Image upload successful:', response);
        // Handle the response from the server, if needed
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.warn('No file selected.');
    }
  }

  async uploadImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
  
    const userId = this.user.id; // Assuming "id" is a property in userData
    formData.append('userId', userId);
      try {
        const response = await this.http.post<any>('http://localhost:3000/upload/img', formData).toPromise();
        
        console.log('Image upload successful:', response);
        // Handle the response from the server, if needed
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.warn('No file selected.');
    }
  }

  getimg(id:any) {
    let queryParams = `?id=${encodeURIComponent(id)}`;
    this.http.get(`http://localhost:3000/img${queryParams}`).subscribe((result: any) => {
      console.log(result);
      this.img = result ;
    });
  }

}
