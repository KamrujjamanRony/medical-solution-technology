import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environments';
import { ProductModel } from 'app/core/features/model/product.model';
import { ProductService } from 'app/core/features/services/product.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  yourTitle!: string;
  yourSub1: string = 'Home';
  yourSub2: string = 'Products';
  img: string = 'https://img.freepik.com/free-photo/figurine-heart-surrounded-by-capsules_23-2148441899.jpg?w=1380&t=st=1701011273~exp=1701011873~hmac=8441e68cf4ede6d7211a1c57cdc0bb51e25ea970961de530573fdd9144b55d65';
  category: string | null = null;
  paramsSubscription?: Subscription;
  products: any[] | undefined;
  categoryProducts: any[] | undefined;
  pathology: any[] | undefined;
  surgical: any[] | undefined;
  imaging: any[] | undefined;
  ot: any[] | undefined;
  others: any[] | undefined;
  products$?: Observable<ProductModel[]>;
  companyID: number = environment.companyCode;
  loading: boolean = true;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {
    if (!this.products$) {
      this.products$ = productService.getCompanyProducts(this.companyID);
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.paramsSubscription = this.route.paramMap.subscribe((params) => {
      this.category = params.get('category');
      if (this.category === 'pathology') {
        this.yourTitle = 'PATHOLOGY';
      } else if (this.category==="surgical") {
        this.yourTitle = "SURGICAL"
      } else if (this.category === 'imaging') {
        this.yourTitle = 'IMAGING';
      } else if (this.category === 'ot') {
        this.yourTitle = 'OT ITEM';
      } else if (this.category === 'others') {
        this.yourTitle = 'OTHERS';
      } else {
        this.yourTitle = 'all equipments';
      }
      if (!this.products) {
        // this.products$ = this.productService.getCompanyProducts(this.companyID);
        this.products$?.subscribe((products) => {
          this.loading = false;
          this.categoryProducts = products;
          this.filterByParams(products);
        });
      } else {
        // Products are already loaded, filter them
        this.filterByParams(this.products);
      }
    });
  }

  sortProducts(data: any): any {
    if (data.length === 0) {
      return data;
    }

    return data.sort((a: any, b: any) => a.productSl - b.productSl);
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }

  filterByParams(products: ProductModel[]): void {
        this.pathology = products.filter(
          (product) => product?.productCategory === 'PATHOLOGY'
        );
        this.surgical = this.products?.filter(
          (product) => product?.category === "surgical-equipment"
        );
        this.imaging = products.filter(
          (product) => product?.productCategory === 'IMAGING'
        );
        this.ot = products.filter(
          (product) => product?.productCategory === 'OT ITEM'
        );
        this.others = products.filter(
          (product) => product?.productCategory === 'OTHERS'
        );
        this.products = products;
  }

  scrollToTop() {
    // Scroll to the top of the page
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
  }
}
