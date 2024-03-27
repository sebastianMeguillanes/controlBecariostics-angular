import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  crearTarea(data: any) {
    return this.http.post<any>(`${this.apiUrl}/api/tarea`, data);
  }
}