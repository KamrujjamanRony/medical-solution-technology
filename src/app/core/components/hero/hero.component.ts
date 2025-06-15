import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AboutService } from 'app/core/features/services/about.service';
import { environment } from '@environments/environments';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  standalone: true,
  imports: [RouterLink]
})
export class HeroComponent implements OnInit {
  allAbout$?: Observable<any[]>;
  about!: any;

  constructor(private aboutService: AboutService) { }

  ngOnInit(): void {
    this.allAbout$ = this.aboutService.getAllAbout();
    this.allAbout$.subscribe(aboutUs => {
      if (aboutUs) {
        this.about = aboutUs.find(a => a.companyID === environment.companyCode);
      }
    });
  };
}
