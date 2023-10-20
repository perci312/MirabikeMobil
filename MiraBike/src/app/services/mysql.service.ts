import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MysqlService {
  private apiUrl = 'http://localhost/conexion_segun_ia/db.php';

  constructor(private http: HttpClient) { }

  getClientes() {
    return this.http.get<any[]>(this.apiUrl);
  }
}

