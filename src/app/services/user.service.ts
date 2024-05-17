import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/user'; 

  constructor(private http: HttpClient) {}

  getUserData(): Observable<User> {
    const userId = sessionStorage.getItem('user-id');
    const token = sessionStorage.getItem('auth-token');
    
    if (!userId) {
      return throwError(() => new Error('User ID not found in session storage'));
    }
    
    if (!token) {
      return throwError(() => new Error('Token not found in session storage'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>(`${this.apiUrl}/${userId}`, { headers }).pipe(
      tap((userData: User) => {  
        localStorage.setItem('user-name', userData.name);
        localStorage.setItem('user-email', userData.email);
      }),
      catchError(error => throwError(error))
    );
  }

  updateUserData(updatedUserData: Partial<User>): Observable<any> {
    const userId = sessionStorage.getItem('user-id');
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      return throwError(() => new Error('Token not found in session storage'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.apiUrl}/update/${userId}`, updatedUserData, { headers }).pipe(
      catchError(error => throwError(error))
    );
  }
}
