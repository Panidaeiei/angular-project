import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CatService } from '../../services/api/cat.service';
import Chart from 'chart.js/auto';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-preimgrank',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,CommonModule,MatInputModule ,MatFormFieldModule,MatListModule,FormsModule ,HttpClientModule
  ],
  templateUrl: './preimgrank.component.html',
  styleUrl: './preimgrank.component.scss'

})
export class PreimgrankComponent implements OnInit {
  id: any;
  cat: any;
  name: any;
  image: any;

  @ViewChild('myChart') myChartRef!: ElementRef;

  constructor(private route: ActivatedRoute, private service: CatService, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.getcat(this.id);
    });
  }

  async getcat(id: any) {
    this.cat = await this.service.get1cat(id);
    console.log(this.cat[0].name);
    this.name = this.cat[0].name;
    this.image = this.cat[0].image;
    this.createChart();
  }

  createChart() {
    const ctx = this.myChartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [{
          label: 'Series A',
          data: [65, 59, 80, 81, 56],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
