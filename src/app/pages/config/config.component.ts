import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { User } from '../../../types/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent {
  user: User = {
    name: '',
    email: '',
    password: ''
  };
  username: string = '';
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.getUsernameFromLocalStorage();
    this.getUserData();
  }

  getUserData(): void {
    this.userService.getUserData().subscribe({
      next: (userData) => {
        this.user = userData;
      },
      error: () => {
        Swal.fire('Erro', 'Não foi possível obter os dados do usuário.', 'error');
      }
    });
  }

  updateUser(): void {
    this.userService.updateUserData(this.user).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Dados do usuário atualizados com sucesso!', 'success');
      },
      error: () => {
        Swal.fire('Erro', 'Não foi possível atualizar os dados do usuário.', 'error');
      }
    });
  }
  
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

  getUsernameFromLocalStorage(): void {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      const parts = storedUsername.split(' ');
      const firstName = parts[0];
      this.username = firstName;
    }
  }
}
