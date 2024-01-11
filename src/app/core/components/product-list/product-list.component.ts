import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environments';
import { ProductModel } from 'app/core/features/model/product.model';
import { ProductService } from 'app/core/features/services/product.service';
import { Observable, Subscription } from 'rxjs';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})



export class ProductListComponent implements OnInit, OnDestroy {
  yourTitle: string = 'all products list';
  yourSub1: string = 'Dashboard';
  yourSub2: string = 'Products';
  img: string = 'https://img.freepik.com/free-photo/doctors-stethoscope-white-background_53876-146858.jpg?w=1380&t=st=1701010335~exp=1701010935~hmac=d87ccb8622bcec8e4fc9de907ac3d31b429544dc0e04920b7e8abdba2e682d62';
  emptyImg: string = environment.emptyImg;
  loading: boolean = true;
  products$?: Observable<ProductModel[]>;
  deleteProductSubscription?: Subscription;
  companyID: number = environment.companyCode;
  ImageApi: string = environment.ImageApi;
  isModalOpen = false;
  constructor(private productService: ProductService, private router: Router, private dialog: MatDialog) {
    if (!this.products$) {
      this.products$ = productService.getCompanyProducts(this.companyID);
      this.products$.subscribe(() => {
        this.loading = false;
      });
    }
   }

  ngOnInit(): void {
    // this.products$ = this.productService.getCompanyProducts(this.companyID);

    // this.products$.subscribe(() => {
    //   this.loading = false;
    // });
  }
  
  onDelete(id: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationModalComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.confirmDelete(id)
      }
    });
  }

  confirmDelete(id: string): void {
    this.deleteProductSubscription = this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products$ = this.productService.getCompanyProducts(this.companyID);
        this.closeModal();
      },
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  ngOnDestroy(): void {
    this.deleteProductSubscription?.unsubscribe();
  }
}