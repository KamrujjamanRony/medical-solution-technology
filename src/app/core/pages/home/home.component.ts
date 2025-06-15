import { Component } from '@angular/core';
import { CarouselComponent } from 'app/core/components/carousel/carousel.component';
import { HeroComponent } from 'app/core/components/hero/hero.component';
import { OurProductsComponent } from 'app/core/components/our-products/our-products.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [CarouselComponent, HeroComponent, OurProductsComponent]
})
export class HomeComponent {

}
