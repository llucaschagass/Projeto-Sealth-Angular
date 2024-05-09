import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MedicinesService } from '../../services/medicines.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medicines',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './medicines.component.html',
  styleUrl: './medicines.component.scss'
})
export class MedicinesComponent {
  username: string = '';
  medicines: string[] = [];
  selectedMedicine: string = '';

  constructor(private router: Router, private medicinesService: MedicinesService) {}

  ngOnInit(): void {
    this.getMedicines()
    this.getUsernameFromLocalStorage();
  }
  
  redirectToHome(): void {
    this.router.navigate(['/home']);
    this.getMedicines();
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

  getMedicines(): void {
    this.medicinesService.getMedicinesPDFs().subscribe(
      (medicines: string[]) => {
        this.medicines = medicines;
      },
      (error) => {
        console.error('Error fetching medicines:', error);
      }
    );
  }

  selectMedicine(medicine: string): void {
    this.selectedMedicine = medicine;
  }

  downloadPDF(medicine: string): void {
   const pdfUrl = `/assets/pdf/${medicine}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${medicine}.pdf`;
    link.click();
  }
  
  getUsernameFromLocalStorage(): void {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      const parts = storedUsername.split(' ');
      const firstName = parts[0];
      this.username = firstName;
    }
  }
}
