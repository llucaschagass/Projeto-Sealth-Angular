import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private readonly apiUrl: string = "http://localhost:8080/health";

  constructor(private httpClient: HttpClient) { }

  getHealthDefaults() {
    return this.httpClient.get<any>(`${this.apiUrl}/defaults`);
  }
}