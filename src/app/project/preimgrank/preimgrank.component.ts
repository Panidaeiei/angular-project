import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-preimgrank',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule
  ],
  templateUrl: './preimgrank.component.html',
  styleUrls: ['./preimgrank.component.scss']

})
export class PreimgrankComponent implements OnInit {
  constructor() {}
  public chart: any;
  ngOnInit(): void {
    this.createChart();
  }

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Vote History",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'orange'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
}
