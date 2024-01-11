import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environments';
import { CarouselModel } from 'app/core/features/model/carousel.model';
import { CarouselService } from 'app/core/features/services/carousel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-carousel',
  templateUrl: './edit-carousel.component.html',
  styleUrls: ['./edit-carousel.component.css']
})
export class EditCarouselComponent implements OnInit, OnDestroy {
  yourTitle: string = 'Update Carousel information';
  yourSub1: string = 'Dashboard';
  yourSub2: string = 'Edit Carousel';
  ImageApi: string = environment.ImageApi;
  emptyImg: string = environment.emptyImg;
  err: string = '';
  img: string = 'https://img.freepik.com/free-photo/minimalistic-science-banner-with-stethoscope_23-2149431138.jpg?w=1380&t=st=1701010689~exp=1701011289~hmac=4cf7508d543ecb1a8ead41a975e20f6e66168d67642c1abfd887edf5c8fe7840';
  id: string | null = null;
  url!: string;
  private file?: File;
  carouselInfo?: CarouselModel;
  paramsSubscription?: Subscription;
  editCarouselSubscription?: Subscription;
  constructor(private route: ActivatedRoute, private router: Router, private carouselService: CarouselService) { }
  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.carouselService.getCarousel(this.id)
            .subscribe({
              next: (response) => {
                this.carouselInfo = response;
                this.url = response.imageUrl;
              }
            });
        }
      }
    });
  }

  onFormSubmit(): void {

    const formData = new FormData();

    formData.append('CompanyID', environment.companyCode.toString());
    formData.append('Title', this.carouselInfo?.title ?? '');
    formData.append('Description', this.carouselInfo?.description ?? '');
    if (this.file instanceof File) {
      formData.append('ImageFormFile', this.file);
    } 
    else {
      formData.append('ImageUrl', this.url ?? '');
    }

    if (this.id) {
      this.editCarouselSubscription = this.carouselService.updateCarousel(this.id, formData)
        .subscribe({
          next: (response) => {
            this.router.navigate(['mst23/carousel']);
          }
        });
    }
  };

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCarouselSubscription?.unsubscribe();
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
