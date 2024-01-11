import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AboutModel } from 'app/core/features/model/about.model';
import { AboutService } from 'app/core/features/services/about.service';
import { environment } from '@environments/environments';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  allAbout$?: Observable<AboutModel[]>;
  about!: any;

  constructor(private aboutService: AboutService) { }
  
  ngOnInit(): void {
    this.allAbout$ = this.aboutService.getAllAbout();
      this.allAbout$.subscribe(aboutUs => {
        if (aboutUs) {
          this.about = aboutUs.find(a=>a.companyID=== environment.companyCode);
        }
      });
  };
}
