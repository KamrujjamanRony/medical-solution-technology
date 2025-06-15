import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '@environments/environments';
import { ProductService } from 'app/core/features/services/product.service';
import { Observable, Subscription } from 'rxjs';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CoverComponent } from '../cover/cover.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [CommonModule, CoverComponent, RouterLink, MatDialogModule]
})



export class ProductListComponent implements OnInit, OnDestroy {
  yourTitle: string = 'all products list';
  yourSub1: string = 'Dashboard';
  yourSub2: string = 'Products';
  img: string = 'https://img.freepik.com/free-photo/doctors-stethoscope-white-background_53876-146858.jpg?w=1380&t=st=1701010335~exp=1701010935~hmac=d87ccb8622bcec8e4fc9de907ac3d31b429544dc0e04920b7e8abdba2e682d62';
  emptyImg: string = environment.emptyImg;
  loading: boolean = true;
  products$?: Observable<any[]>;
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

  sortProducts(data: any): any {
    if (data?.length === 0) {
      return data;
    }

    return data?.sort((a: any, b: any) => a.productSl - b.productSl);
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