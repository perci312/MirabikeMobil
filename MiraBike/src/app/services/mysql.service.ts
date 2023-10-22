import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MysqlService {
  private apiUrl = 'https://vd2djqqrt8.execute-api.us-east-2.amazonaws.com/Consulta_tablas';

  constructor(private http: HttpClient) { }

  getClientes() {
    return this.http.get(`${this.apiUrl}/app_cliente`);
  }
}


