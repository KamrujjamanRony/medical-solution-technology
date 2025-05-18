import { Component, inject } from '@angular/core';
import { DataService } from 'app/core/features/services/data.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  private readonly dataService = inject(DataService);
  password: string = "";
  isAuthorized: boolean = false;
  pass: string = "";
  err: string = '';

  ngOnInit() {
    // Fetch the password from the JSON file
    this.dataService.getPassword().subscribe((data: any) => {
      this.password = data;
    });
  }

  onSubmitAuth(data: any): void {
    this.pass === this.password ? this.isAuthorized = true : this.err = "Please enter correct password";
  }
}
