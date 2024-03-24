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
import { CommonModule } from '@angular/common';
import { CatService } from '../../services/api/cat.service';
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
  constructor(private router: Router , private http:HttpClient,private service2:ServiceService,private service:CatService) {}
 

  ngOnInit() {
    this.service2.userData$.subscribe((userData) => {
      console.log('userdata', userData); 
      this.user = userData;
      this.getimg(this.user.id);
    });
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
  async changeImage(id: any) {
    if (this.uploadFile) {
      const formData = new FormData();
      formData.append('file', this.uploadFile);
      formData.append('id', id);
      console.log('f2', id);
      try {
        await this.service.putimg(id, formData);
        console.log('Image upload successful');
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
        await this.service.uploadImage(formData);
        console.log('Image upload successful');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.warn('No file selected.');
    }
  }
  

  async getimg(id: any) {
    try {
      const queryParams = `?id=${encodeURIComponent(id)}`;
      const response = await this.service.get5img(queryParams);
      console.log(response);
      this.img = response;
    } catch (error) {
      console.error('Error getting image:', error);
    }
  }
  
  

}
