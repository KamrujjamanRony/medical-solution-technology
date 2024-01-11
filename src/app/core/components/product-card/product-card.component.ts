import { Component, Input } from '@angular/core';
import { environment } from '@environments/environments';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: any;
  ImageApi: string = environment.ImageApi;
  emptyImg: string = environment.emptyImg;;
}
