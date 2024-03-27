import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicines',
  standalone: true,
  imports: [],
  templateUrl: './medicines.component.html',
  styleUrl: './medicines.component.scss'
})
export class MedicinesComponent {
  constructor(private router: Router) {}
  
  redirectToHome(): void {
    this.router.navigate(['/home']);
  }
}
