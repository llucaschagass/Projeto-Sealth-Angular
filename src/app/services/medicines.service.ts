import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicinesService {
  private readonly apiUrl: string = "http://localhost:8080/medicines/pdf";

  constructor(private httpClient: HttpClient) { }

  getMedicinesPDFs() {
    return this.httpClient.get<string[]>(this.apiUrl);
  }
}
