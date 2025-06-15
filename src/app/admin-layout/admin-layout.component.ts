import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from 'app/core/components/sidebar/sidebar.component';
import { DataService } from 'app/core/features/services/data.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  standalone: true,
  imports: [RouterOutlet, FormsModule, SidebarComponent, CommonModule]
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
