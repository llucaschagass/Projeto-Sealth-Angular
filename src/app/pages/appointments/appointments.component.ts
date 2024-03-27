import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent {
  constructor(private router: Router) {}
  
  redirectToHome(): void {
    this.router.navigate(['/home']);
  }
}
