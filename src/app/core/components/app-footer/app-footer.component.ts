import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environments';
import { ContactService } from 'app/core/features/services/contact.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AppFooterComponent implements OnInit {
  // Define FontAwesome icons
  faFacebook = "F";
  faInstagram = "I";
  faTwitter = "T";
  allContact$?: Observable<any[]>;
  contact!: any;
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.allContact$ = this.contactService.getAllContact();
    this.allContact$.subscribe(contactUs => {
      if (contactUs) {
        this.contact = contactUs.find(a => a.companyID === environment.companyCode);
      }
    });
  }
}
