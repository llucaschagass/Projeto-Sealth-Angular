import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { User } from '../../../types/user.type';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  standalone: true,
  imports: [
    FormsModule 
  ]
})
export class ConfigComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    password: '',
    id: '',
    newName: '',
    newEmail: '',
    newPassword: ''
  };
  userId: string = ''; 
  username: string = ''; 
  oldName: string = '';
  oldEmail: string = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.getUsernameFromLocalStorage();
    this.getUserData();
    this.user = {
      name: '',
      email: '',
      password: '',
      id: '',
      newName: '',
      newEmail: '',
      newPassword: ''
    };
  }

  getUserData(): void {
    this.userService.getUserData().subscribe({
      next: (userData) => {
        this.user = userData;
        this.userId = userData.id;
        this.oldName = localStorage.getItem('user-name') || '';
        this.oldEmail = localStorage.getItem('user-email') || '';
      },
      error: () => {
        Swal.fire({
          title: 'Erro',
          text: 'Não foi possível obter os dados do usuário.',
          icon: 'error',
          confirmButtonColor: '#046B46',
        });
      }
    });
  }

  updateUser(): void {
    const oldName = localStorage.getItem('user-name');
    const oldEmail = localStorage.getItem('user-email');
  
    if ((oldName === this.user.newName) && (oldEmail === this.user.newEmail)) {
      Swal.fire({
        title: 'Atenção',
        text: 'Os itens que você está tentando alterar são iguais aos atuais. Por favor, faça alterações válidas.',
        icon: 'warning',
        confirmButtonColor: '#046B46',
      });
      return;
    }
  
    if ((oldName === this.user.newName) || (oldEmail === this.user.newEmail)) {
      Swal.fire({
        title: 'Atenção',
        text: 'Um dos itens que você está tentando alterar é igual ao atual. Deseja continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#046B46',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, continuar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.executeUserUpdate();
        }
      });
      return;
    }
  
    this.executeUserUpdate();
  }
  
  executeUserUpdate(): void {
    if (!this.userId) {
      Swal.fire({
        title: 'Erro',
        text: 'Não foi possível obter o ID do usuário.',
        icon: 'error',
        confirmButtonColor: '#046B46',
      });
      return;
    }
  
    const updatedUserData = {
      name: this.user.newName,
      email: this.user.newEmail,
      password: this.user.newPassword
    };
  
    this.userService.updateUserData(updatedUserData).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Dados do usuário atualizados com sucesso!',
          icon: 'success',
          confirmButtonColor: '#046B46'
        }).then(() => {
          Swal.fire({
            title: 'Aviso',
            text: 'Os dados foram atualizados. É necessário autenticar novamente.',
            icon: 'warning',
            confirmButtonColor: '#046B46'
          }).then(() => {
            window.location.href = '/login';
          });
        });
      },
      error: (error) => {
        console.error('Erro ao atualizar os dados do usuário:', error);
        Swal.fire({
          title: 'Erro',
          text: 'Não foi possível atualizar os dados do usuário.',
          icon: 'error',
          confirmButtonColor: '#046B46'
        });
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
