import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoComponent } from './pages/info/info.component';
import { ConfigComponent } from './pages/config/config.component';
import { HealthComponent } from './pages/health/health.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { MedicinesComponent } from './pages/medicines/medicines.component';
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignupComponent
    },
    {
        path: "home",
        component: HomeComponent,
        canActivate:[AuthGuard]
    },
    {
        path: "info",
        component: InfoComponent,
        canActivate:[AuthGuard]
    },
    {
        path: "config",
        component: ConfigComponent,
        canActivate:[AuthGuard]
    },
    {
        path: "health",
        component: HealthComponent,
        canActivate:[AuthGuard]
    },
    {
        path: "appointment",
        component: AppointmentsComponent,
        canActivate:[AuthGuard]
    },
    {
        path: "medicines",
        component: MedicinesComponent,
        canActivate:[AuthGuard]
    }
];
