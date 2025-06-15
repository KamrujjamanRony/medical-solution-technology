import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from '@environments/environments';
import { CoverComponent } from 'app/core/components/cover/cover.component';
import { ContactService } from 'app/core/features/services/contact.service';
import { Observable } from 'rxjs';
import { Carousel, Dropdown, initTE } from 'tw-elements';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [CoverComponent, CommonModule]
})
export class ContactComponent implements OnInit {
  yourTitle: string = 'Contact Us';
  yourSub1: string = 'Home';
  yourSub2: string = 'Contact Us';
  img: string = 'https://img.freepik.com/free-photo/minimalistic-science-banner-with-microscope_23-2149431099.jpg?w=1380&t=st=1701006835~exp=1701007435~hmac=9813a920bfc56997ca5f3af792b1af0373f1de201b4dc5e8f4e744f65da61f14';
  allContact$?: Observable<any[]>;
  location: string = environment.location;
  mapUrl: SafeResourceUrl;
  contact!: any;

  constructor(private contactService: ContactService, private router: Router, private sanitizer: DomSanitizer) {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${this.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`);
  }

  ngOnInit(): void {
    initTE({ Carousel, Dropdown });
    this.allContact$ = this.contactService.getAllContact();
    this.allContact$.subscribe(contactUs => {
      if (contactUs) {
        this.contact = contactUs.find(a => a.companyID === environment.companyCode);
      }
    });
  }
}
