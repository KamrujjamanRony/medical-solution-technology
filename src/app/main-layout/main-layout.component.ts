import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppFooterComponent } from 'app/core/components/app-footer/app-footer.component';
import { HeaderComponent } from 'app/core/components/header/header.component';
import { NavbarComponent } from 'app/core/components/navbar/navbar.component';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.css'],
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, NavbarComponent, AppFooterComponent]
})
export class MainLayoutComponent {

}
