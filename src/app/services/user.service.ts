import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/user'; 

  constructor(private http: HttpClient) {}

  getUserData(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  updateUserData(userData: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, userData);
  }
}
