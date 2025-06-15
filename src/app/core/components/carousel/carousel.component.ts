import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '@environments/environments';
import { CarouselService } from 'app/core/features/services/carousel.service';
import { IgxCarouselModule, IgxSliderModule } from 'igniteui-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  standalone: true,
  imports: [CommonModule, IgxCarouselModule, IgxSliderModule, RouterLink]
})
export class CarouselComponent implements OnInit {
  carousel$?: Observable<any[]>;
  companyID: number = environment.companyCode;
  ImageApi: string = environment.ImageApi;
  loading: boolean = true;

  constructor(private carouselService: CarouselService) {
    if (!this.carousel$) {
      this.carousel$ = carouselService.getCompanyCarousel(this.companyID);
    }
  }

  ngOnInit(): void {
    // this.carousel$ = this.carouselService.getCompanyCarousel(this.companyID);
    // this.carousel$.subscribe(() => {
    //   this.loading = false;
    // });
  }
}
