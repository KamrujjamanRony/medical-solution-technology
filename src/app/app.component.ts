import { Component } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Medical Solution Technology';
  ngOnInit(): void {
    AOS.init({
      duration: 750,
      delay: 150,
    })
    console.log("Develope by Md. Kamrujjaman at SuperSoft")
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      AOS.refresh()
    }, 500)
  }
  
}
