import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environments';
import { CoverComponent } from 'app/core/components/cover/cover.component';
import { AboutService } from 'app/core/features/services/about.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: true,
  imports: [CoverComponent, CommonModule]
})
export class AboutComponent implements OnInit {
  yourTitle: string = "About Us";
  yourSub1: string = 'Home';
  yourSub2: string = 'About Us';
  img: string = 'https://img.freepik.com/free-photo/horizontal-science-banner-with-glass-containers_23-2149495012.jpg?w=1380&t=st=1701005307~exp=1701005907~hmac=901ab4a86dee97bcf0034036b16d4c887f698845237135f27518064537728b6b';

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
