import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule,Router,RouterLink} from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { ServiceService } from '../../service.service';
import { HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CatModel } from '../../model';

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
    RouterLink],
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent {
  user:any=[];
  img:any=[];
  constructor(private router: Router , private http:HttpClient,private service:ServiceService) {}
  ngOnInit() {
    this.service.userData$.subscribe((userData) => {
      console.log('userdata',userData); // Use the userData as needed in your component
      this.user = userData ;
    });
  }
  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async uploadImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
  
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
  

}
