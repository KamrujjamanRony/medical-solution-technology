import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AboutService } from 'app/core/features/services/about.service';
import { environment } from '@environments/environments';
import { ContactService } from 'app/core/features/services/contact.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [RouterLink]
})
export class SidebarComponent implements OnInit {
  companyID: string = environment.companyCode.toString();
  allAbout$?: Observable<any[]>;
  allAddress$?: Observable<any[]>;
  about!: any;
  address!: any;
  constructor(private aboutService: AboutService, private contactService: ContactService) { }
  ngOnInit(): void {
    this.allAbout$ = this.aboutService.getAllAbout();
    this.allAbout$.subscribe(aboutUs => {
      if (aboutUs) {
        this.about = aboutUs.find(a => a.companyID === environment.companyCode);
      }
    });
    this.allAddress$ = this.contactService.getAllContact();
    this.allAddress$.subscribe(addressUs => {
      if (addressUs) {
        this.address = addressUs.find(a => a.companyID === environment.companyCode);
      }
    });
  }

}
