import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environments';
import { ProductModel } from 'app/core/features/model/product.model';
import { UpdateProductRequest } from 'app/core/features/model/update-product-request.model';
import { ProductService } from 'app/core/features/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy {
  yourTitle: string = 'Update Product information';
  yourSub1: string = 'Dashboard';
  yourSub2: string = 'Edit Product';
  err: string = '';
  img: string = 'https://img.freepik.com/free-photo/doctors-stethoscope-white-background_53876-146858.jpg?w=1380&t=st=1701010335~exp=1701010935~hmac=d87ccb8622bcec8e4fc9de907ac3d31b429544dc0e04920b7e8abdba2e682d62';
  id: string | null = null;
  url!: string;
  private file?: File;
  productInfo?: ProductModel;
  paramsSubscription?: Subscription;
  editProductSubscription?: Subscription;
  ImageApi: string = environment.ImageApi;
  emptyImg: string = environment.emptyImg;
  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }
  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.productService.getProduct(this.id)
            .subscribe({
              next: (response) => {
                this.productInfo = response;
                this.url = this.productInfo.imageUrl;
              }
            });
        }
      }
    });
  }

  onFormSubmit(): void {

    const formData = new FormData();

    formData.append('CompanyID', environment.companyCode.toString());
    formData.append('productSl', this.productInfo?.productSl ?? '');
    formData.append('ProductCategory', this.productInfo?.productCategory ?? '');
    formData.append('ProductName', this.productInfo?.productName ?? '');
    formData.append('Brand', this.productInfo?.brand ?? '');
    formData.append('Model', this.productInfo?.model ?? '');
    formData.append('Origin', this.productInfo?.origin ?? '');
    formData.append('Description', this.productInfo?.description ?? '');
    formData.append('AditionalInformation', this.productInfo?.aditionalInformation ?? '');
    formData.append('SpecialFeature', this.productInfo?.specialFeature ?? '');
    formData.append('CatalogUrl', this.productInfo?.catalogUrl ?? '');
    if (this.file instanceof File) {
      formData.append('ImageFormFile', this.file);
    }
    else {
      formData.append('ImageUrl', this.url ?? '');
    }

    if (this.id) {
      this.editProductSubscription = this.productService.updateProduct(this.id, formData)
        .subscribe({
          next: (response) => {
            this.router.navigate(['mst49/products']);
          }
        });
    }
  };

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editProductSubscription?.unsubscribe();
  }

  onFileChange(event: any): void {
    const element = event.currentTarget as HTMLInputElement;


    if (element.files && element.files.length > 0) {
      const file = element.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const uint = new Uint8Array(reader.result as ArrayBuffer);
        const bytes: any = [];

        uint.forEach((byte) => {
          bytes.push(byte.toString(16));
        });

        const hex = bytes.join('').toUpperCase();

        if (hex.startsWith('89504E47') || hex.startsWith('FFD8FFDB') || hex.startsWith('FFD8FFE0')) {
          this.file = element.files?.[0];
          this.err = '';
        } else {
          this.err = 'Invalid file type. Please upload a valid image file.';
          element.value = '';
        }
      };

      reader.readAsArrayBuffer(file);
    }
  }
}
