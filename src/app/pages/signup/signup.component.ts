import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers:[
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup<SignupForm>;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  submit(){
    this.loginService.signup(this.signupForm.value.name,this.signupForm.value.email, this.signupForm.value.password).subscribe({
      next: () => {
        Swal.fire({
            title: 'Sucesso!',
            text: 'Usuário criado com sucesso!',
            icon: 'success',
            confirmButtonColor: '#046B46',
            confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/login']);
        });
    },
    error: () => {
        Swal.fire({
            title: 'Erro!',
            text: 'Erro inesperado! Tente novamente mais tarde.',
            icon: 'error',
            confirmButtonColor: '#046B46',
            confirmButtonText: 'OK'
        });
    }
      
    })
  }

  navigate(){
    this.router.navigate(["/login"])
  }
}
