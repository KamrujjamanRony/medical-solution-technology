import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environments';
import { AboutService } from 'app/core/features/services/about.service';
import { Subscription } from 'rxjs';
import { CoverComponent } from '../cover/cover.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  standalone: true,
  imports: [CoverComponent, FormsModule, CommonModule]
})
export class AboutUsComponent implements OnInit, OnDestroy {
  yourTitle: string = 'Update About Us';
  yourSub1: string = 'Dashboard';
  yourSub2: string = 'About Us';
  img: string = 'https://img.freepik.com/free-photo/top-view-stethoscope-world-heart-day_23-2148635217.jpg?w=1800&t=st=1701011392~exp=1701011992~hmac=b5be3feeebc0a6e9db056b2a6dc9fba6952bbb5356525fd78b560742b3b9c6a3';
  id: string | null = null;
  aboutInfo?: any;
  paramsSubscription?: Subscription;
  editAboutUsSubscription?: Subscription;
  constructor(private route: ActivatedRoute, private router: Router, private aboutService: AboutService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.aboutService.getAbout(this.id)
            .subscribe({
              next: (response) => {
                this.aboutInfo = response;
              }
            });
        }
      }
    });
  }

  onFormSubmit(): void {

    const formData = new FormData();

    formData.append('companyID', environment.companyCode.toString());
    formData.append('heading', this.aboutInfo?.heading ?? '');
    formData.append('title', this.aboutInfo?.title ?? '');
    formData.append('description', this.aboutInfo?.description ?? '');
    formData.append('title2', this.aboutInfo?.title2 ?? '');
    formData.append('description2', this.aboutInfo?.description2 ?? '');
    formData.append('title3', this.aboutInfo?.title3 ?? '');
    formData.append('description3', this.aboutInfo?.description3 ?? '');
    formData.append('title4', this.aboutInfo?.title4 ?? '');
    formData.append('description4', this.aboutInfo?.description4 ?? '');
    formData.append('title5', this.aboutInfo?.title5 ?? '');
    formData.append('description5', this.aboutInfo?.description5 ?? '');

    if (this.id) {
      this.editAboutUsSubscription = this.aboutService.updateAbout(this.id, formData)
        .subscribe({
          next: (response) => {
            this.router.navigate(['about']);
          }
        });
    }
  };

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editAboutUsSubscription?.unsubscribe();
  }

}
