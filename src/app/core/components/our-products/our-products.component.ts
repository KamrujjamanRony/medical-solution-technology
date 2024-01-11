import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environments';
import { ProductModel } from 'app/core/features/model/product.model';
import { ProductService } from 'app/core/features/services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.css']
})
export class OurProductsComponent implements OnInit {
  products$?: Observable<ProductModel[]>;
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

  scrollToTopAndNavigate(route: string): void {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  
    // Navigate to the specified route
    this.router.navigateByUrl(route);
  }
}
