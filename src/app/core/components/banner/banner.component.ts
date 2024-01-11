import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  bannerBg: string = '/assets/banner-pattern.svg'; // Adjust the path as needed
  mobile: string = '/assets/mobile_app.png'; // Adjust the path as needed
}
