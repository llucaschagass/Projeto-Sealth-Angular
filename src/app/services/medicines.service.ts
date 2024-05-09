import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicinesService {
  private readonly apiUrl: string = "http://localhost:8080/medicines/pdf";

  constructor(private httpClient: HttpClient) { }

  getMedicinesPDFs() {
    const token = sessionStorage.getItem('auth-token');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.httpClient.get<string[]>(this.apiUrl, { headers }).pipe(
        tap((response) => {
          localStorage.setItem('medicinesPDFs', JSON.stringify(response));
        }),
        catchError((error) => {
          return throwError(() => new Error(error.message || 'Server error'));
        })
      );
    } else {
      return throwError(() => new Error('Token not found in session storage'));
    }
  }
}