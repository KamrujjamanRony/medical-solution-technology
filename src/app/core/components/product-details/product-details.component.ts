import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environments';
import { ProductModel } from 'app/core/features/model/product.model';
import { ProductService } from 'app/core/features/services/product.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  yourTitle: string = 'product details';
  yourSub1: string = 'Home';
  yourSub2: string = 'Product';
  img: string = 'https://img.freepik.com/free-photo/doctors-stethoscope-white-background_53876-146858.jpg?w=1380&t=st=1701010335~exp=1701010935~hmac=d87ccb8622bcec8e4fc9de907ac3d31b429544dc0e04920b7e8abdba2e682d62';
  id!: string | null;
  products$?: Observable<ProductModel[]>;
  product: any | undefined = undefined;
  paramsSubscription?: Subscription;
  loading: boolean = true;
  ImageApi: string = environment.ImageApi;
  emptyImg: string = environment.emptyImg;;

  constructor( private productService: ProductService, private route: ActivatedRoute ) {
    if (!this.products$) {
      this.products$ = productService.getCompanyProducts(environment.companyCode);
    }
   }
  
  ngOnInit(): void {
    // this.products$ = this.productService.getCompanyProducts(environment.companyCode);
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.products$?.subscribe(products => {
        this.product =  products?.find(p => p.id == this.id);
        this.loading = false;
      });
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  };

}
