import { Component } from '@angular/core';
import { environment } from '@environments/environments';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  isAuthorized: boolean = false;
  pass: string = "";
  err: string = '';

  onSubmitAuth(data: any): void {
    this.pass === environment.authKey ? this.isAuthorized = true : this.err = "Please enter correct password";
  }
}
