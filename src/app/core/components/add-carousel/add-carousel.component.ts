import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environments';
import { AddCarouselRequest } from 'app/core/features/model/carousel.model';
import { CarouselService } from 'app/core/features/services/carousel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-carousel',
  templateUrl: './add-carousel.component.html',
  styleUrls: ['./add-carousel.component.css']
})
export class AddCarouselComponent implements OnDestroy {
  // Component properties
  yourTitle: string = 'add a carousel';
  yourSub1: string = 'Dashboard';
  yourSub2: string = 'Add Carousel';
  err: string = '';
  img: string = 'https://img.freepik.com/free-photo/minimalistic-science-banner-with-stethoscope_23-2149431138.jpg?w=1380&t=st=1701010689~exp=1701011289~hmac=4cf7508d543ecb1a8ead41a975e20f6e66168d67642c1abfd887edf5c8fe7840';
  model: AddCarouselRequest;
  private file?: File;
  private addCarouselSubscription?: Subscription;

  constructor(private carouselService: CarouselService, private router: Router) {
    // Initialize model properties
    this.model = {
      companyID: environment.companyCode,
      title: '',
      description: '',
      imageUrl: '',
      imageFile: null,
    };
  }

  // Handle form submission
  onFormSubmit(): void {
    const formData = new FormData();

    formData.append('CompanyID', this.model.companyID.toString());
    formData.append('Title', this.model.title);
    formData.append('Description', this.model.description);
    formData.append('ImageUrl', this.model.imageUrl);
    if (this.file instanceof File) {
      formData.append('ImageFormFile', this.file);
    }

    this.addCarouselSubscription = this.carouselService.addCarousel(formData)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('mst23/carousel');
        },
        error: (error) => {
          console.error('Error adding carousel:', error);
        }
      });
  }

  // Unsubscribe from the subscription to avoid memory leaks
  ngOnDestroy(): void {
    this.addCarouselSubscription?.unsubscribe();
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
