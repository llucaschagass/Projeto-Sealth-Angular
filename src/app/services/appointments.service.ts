import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private apiUrl = 'http://localhost:8080/appointments';

  constructor(private http: HttpClient) { }

  createAppointment(appointmentData: any): Observable<any> {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      return throwError(() => new Error('Token not found in session storage'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.apiUrl}/create`, appointmentData, { headers }).pipe(
      catchError(error => throwError(error))
    );
  }

  getAllAppointments(): Observable<any[]> {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      return throwError(() => new Error('Token not found in session storage'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/all`, { headers }).pipe(
      tap(appointments => {
        localStorage.setItem('appointments', JSON.stringify(appointments));
      }),
      catchError(error => throwError(error))
    );
  }

  updateAppointment(appointmentId: string, updatedData: any): Observable<any> {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      return throwError(() => new Error('Token not found in session storage'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<any>(`${this.apiUrl}/${appointmentId}/update`, updatedData, { headers }).pipe(
      catchError(error => throwError(error))
    );
  }

  cancelAppointment(appointmentId: string): Observable<void> {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      return throwError(() => new Error('Token not found in session storage'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.apiUrl}/${appointmentId}/cancel`, { headers }).pipe(
      catchError(error => throwError(error))
    );
  }
}
