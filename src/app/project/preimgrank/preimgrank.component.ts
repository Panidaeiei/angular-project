import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule} from '@angular/router';


@Component({
  selector: 'app-preimgrank',
  standalone: true,
  imports: [RouterOutlet,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule],
  templateUrl: './preimgrank.component.html',
  styleUrl: './preimgrank.component.scss'
})
export class PreimgrankComponent {

}
