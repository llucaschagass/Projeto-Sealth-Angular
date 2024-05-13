import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AppointmentsService } from '../../services/appointments.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  username: string = '';
  appointments: any[] = [];
  selectedAppointment: any = null;

  constructor(private router: Router, private appointmentsService: AppointmentsService) {}

  redirectToHome(): void {
    this.router.navigate(['/home']);
  }

  confirmLogout(): void {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Deseja realmente sair?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#046B46',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Certeza',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/login'; 
      }
    });
  }

  ngOnInit(): void {
    this.getUsernameFromLocalStorage();
    this.getAllAppointments();
  }

  getUsernameFromLocalStorage(): void {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      const parts = storedUsername.split(' ');
      const firstName = parts[0];
      this.username = firstName;
    }
  }

  getAllAppointments(): void {
    this.appointmentsService.getAllAppointments().subscribe(
      appointments => {
        console.log('Agendamentos obtidos:', appointments);
        this.appointments = appointments;
      },
      error => {
        console.error('Erro ao obter agendamentos:', error);
      }
    );
  }

  selectAppointment(appointment: any): void {
    this.selectedAppointment = appointment;
  }
}