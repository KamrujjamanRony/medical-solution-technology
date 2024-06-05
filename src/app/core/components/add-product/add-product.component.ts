// Import necessary modules and services
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environments';
import { AddProductRequest } from 'app/core/features/model/add-poduct-request.model';
import { ProductService } from 'app/core/features/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnDestroy {
  // Component properties
  yourTitle: string = 'add a product';
  yourSub1: string = 'Dashboard';
  yourSub2: string = 'Add Product';
  err: string = '';
  img: string = 'https://img.freepik.com/free-photo/doctors-stethoscope-white-background_53876-146858.jpg?w=1380&t=st=1701010335~exp=1701010935~hmac=d87ccb8622bcec8e4fc9de907ac3d31b429544dc0e04920b7e8abdba2e682d62';
  model: AddProductRequest;
  private file?: File;
  private addProductSubscription?: Subscription;
  fileInput: any;

  constructor(private productService: ProductService, private router: Router) {
    // Initialize model properties
    this.model = {
      CompanyID: environment.companyCode,
      productSl: '1000',
      ProductCategory: '',
      ProductName: '',
      Brand: '',
      Model: '',
      Origin: '',
      Description: '',
      AditionalInformation: '',
      SpecialFeature: '',
      ImageUrl: '',
      ImageFormFile: null,
      CatalogUrl: '',
    };
  }

  // Handle form submission
  onFormSubmit(): void {
    const formData = new FormData();

    formData.append('CompanyID', this.model.CompanyID.toString());
    formData.append('productSl', this.model.productSl);
    formData.append('ProductCategory', this.model.ProductCategory);
    formData.append('ProductName', this.model.ProductName);
    formData.append('Brand', this.model.Brand);
    formData.append('Model', this.model.Model);
    formData.append('Origin', this.model.Origin);
    formData.append('Description', this.model.Description);
    formData.append('AditionalInformation', this.model.AditionalInformation);
    formData.append('SpecialFeature', this.model.SpecialFeature);
    formData.append('CatalogUrl', this.model.CatalogUrl);
    if (this.file instanceof File) {
      formData.append('ImageFormFile', this.file);
    }

    this.addProductSubscription = this.productService.addProduct(formData)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('mst23/products');
        },
        error: (error) => {
          console.error('Error adding product:', error);
        }
      });
  }

  // Unsubscribe from the subscription to avoid memory leaks
  ngOnDestroy(): void {
    this.addProductSubscription?.unsubscribe();
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
