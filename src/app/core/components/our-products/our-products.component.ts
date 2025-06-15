import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environments';
import { ProductService } from 'app/core/features/services/product.service';
import { Observable } from 'rxjs';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.css'],
  standalone: true,
  imports: [CommonModule, ProductCardComponent]
})
export class OurProductsComponent implements OnInit {
  products$?: Observable<any[]>;
  companyID: number = environment.companyCode;
  loading: boolean = true;

  constructor(private router: Router, private productService: ProductService) {
    if (!this.products$) {
      this.loading = false;
      this.products$ = productService.getCompanyProducts(this.companyID);
    }
  }

  ngOnInit(): void {
    // this.products$ = this.productService.getCompanyProducts(this.companyID);

    // this.products$.subscribe(() => {
    //   this.loading = false;
    // });
  }

  sortProducts(data: any): any {
    if (data?.length === 0 || !data) {
      return data;
    }

    const sortedProducts = data?.sort((a: any, b: any) => a?.productSl - b?.productSl);

    return sortedProducts.slice(0, 15);
  }

  scrollToTopAndNavigate(route: string): void {
    // Scroll to the top of the page
    window.scrollTo(0, 0);

    // Navigate to the specified route
    this.router.navigateByUrl(route);
  }
}
