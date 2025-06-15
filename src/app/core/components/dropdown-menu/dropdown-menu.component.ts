import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css'],
  standalone: true,
  imports: [RouterLink, CommonModule]
})
export class DropdownMenuComponent {
  isOpen: boolean = false;

  toggleDropdownE() {
    this.isOpen = true;
  }
  toggleDropdownL() {
    this.isOpen = false;
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
