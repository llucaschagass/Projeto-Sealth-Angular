import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HealthDefaultsResponse } from '../../types/health-response.type';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private readonly apiUrl: string = "http://localhost:8080/health";

  constructor(private httpClient: HttpClient) { }

  getHealthDefaults(): Observable<HealthDefaultsResponse> {
    const token = sessionStorage.getItem('auth-token'); 

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.httpClient.get<HealthDefaultsResponse>(`${this.apiUrl}/defaults`, { headers }).pipe(
        tap((response) => {
          localStorage.setItem('healthDefaults', JSON.stringify(response));
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