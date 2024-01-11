import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent {
  @Input() title: string = '';
  @Input() sub1: string = '';
  @Input() sub2: string = '';
  @Input() img: string = '';
}
