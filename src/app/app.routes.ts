import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoComponent } from './pages/info/info.component';
import { ConfigComponent } from './pages/config/config.component';
import { HealthComponent } from './pages/health/health.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { MedicinesComponent } from './pages/medicines/medicines.component';

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
        component: HomeComponent
    },
    {
        path: "info",
        component: InfoComponent
    },
    {
        path: "config",
        component: ConfigComponent
    },
    {
        path: "health",
        component: HealthComponent
    },
    {
        path: "appointment",
        component: AppointmentsComponent
    },
    {
        path: "medicines",
        component: MedicinesComponent
    }
];
