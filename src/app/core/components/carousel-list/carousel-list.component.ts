import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '@environments/environments';
import { CarouselModel } from 'app/core/features/model/carousel.model';
import { CarouselService } from 'app/core/features/services/carousel.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-carousel-list',
  templateUrl: './carousel-list.component.html',
  styleUrls: ['./carousel-list.component.css']
})
export class CarouselListComponent implements OnInit, OnDestroy {
  yourTitle: string = 'all carousel information';
  yourSub1: string = 'Dashboard';
  yourSub2: string = 'Carousel';
  img: string = 'https://img.freepik.com/free-photo/minimalistic-science-banner-with-stethoscope_23-2149431138.jpg?w=1380&t=st=1701010689~exp=1701011289~hmac=4cf7508d543ecb1a8ead41a975e20f6e66168d67642c1abfd887edf5c8fe7840';
  emptyImg: string = environment.emptyImg;
  loading: boolean = true;
  carousels$?: Observable<CarouselModel[]>;
  deleteCarouselSubscription?: Subscription;
  companyID: number = environment.companyCode;
  ImageApi: string = environment.ImageApi;
  isModalOpen = false;
  constructor(private carouselService: CarouselService, private router: Router, private dialog: MatDialog) { 
    if (!this.carousels$) {
      this.loading = false;
      this.carousels$ = carouselService.getCompanyCarousel(this.companyID);
    }
  }

  ngOnInit(): void {
    // this.carousels$ = this.carouselService.getCompanyCarousel(this.companyID);

    // this.carousels$.subscribe(() => {
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
    this.deleteCarouselSubscription = this.carouselService.deleteCarousel(id).subscribe({
      next: () => {
        this.carousels$ = this.carouselService.getCompanyCarousel(this.companyID);
        this.closeModal();
      },
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  ngOnDestroy(): void {
    this.deleteCarouselSubscription?.unsubscribe();
  }
}
