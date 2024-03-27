import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-health',
  standalone: true,
  imports: [],
  templateUrl: './health.component.html',
  styleUrl: './health.component.scss'
})
export class HealthComponent {
  userPeso: number = 70; 
  userAltura: number = 1.75; 
  userIdade: number = 30; 
  userSexo: string = 'masculino'; 
  userImc: number = 0; 
  aguaRecomendada: number = 0; 
  caloriasDiarias: number = 0; 
  pesoIdeal: number = 0;
  userImcEvaluation: string = "";
  userWeightStatus: string = "";

  constructor(private router: Router) {
    this.calcularImc();
    this.calcularAguaRecomendada();
    this.calcularCaloriasDiarias();
    this.calcularPesoIdeal();
    this.avaliarIMC();
    this.avaliarPeso();
  }

  redirectToHome(): void {
    this.router.navigate(['/home']);
  }

  calcularImc(): void {
    this.userImc = this.userPeso / (this.userAltura * this.userAltura);
  }

  calcularAguaRecomendada(): void {
    if (this.userSexo === 'masculino') {
      this.aguaRecomendada = (this.userPeso * 35) /1000;
    } else {
      this.aguaRecomendada = (this.userPeso * 31) /1000;
    }
  }

  calcularCaloriasDiarias(): void {
    if (this.userSexo === 'masculino') {
        this.caloriasDiarias = 88.362 + (13.397 * this.userPeso) + (4.799 * this.userAltura * 100) - (5.677 * this.userIdade);
    } else {
        this.caloriasDiarias = 447.593 + (9.247 * this.userPeso) + (3.098 * this.userAltura * 100) - (4.330 * this.userIdade);
    }
    this.caloriasDiarias = this.caloriasDiarias / 1000; 
}

  calcularPesoIdeal(): void {
    if (this.userSexo === 'masculino') {
      this.pesoIdeal = (this.userAltura * 100 - 100) * 0.9;
    } else {
      this.pesoIdeal = (this.userAltura * 100 - 110) * 0.9;
    }
  }

  avaliarIMC(): void {
    if (this.userImc < 18.5) {
      this.userImcEvaluation = "Abaixo do Peso";
    } else if (this.userImc >= 18.5 && this.userImc < 25) {
      this.userImcEvaluation = "Peso Normal";
    } else if (this.userImc >= 25 && this.userImc < 30) {
      this.userImcEvaluation = "Sobrepeso";
    } else {
      this.userImcEvaluation = "Obesidade";
    }
  }

  avaliarPeso(): void {
    if (this.userPeso < 60) {
      this.userWeightStatus = "Abaixo do Peso Ideal";
    } else if (this.userPeso >= 60 && this.userPeso <= 80) {
      this.userWeightStatus = "Peso Ideal";
    } else {
      this.userWeightStatus = "Acima do Peso Ideal";
    }
  }

}
