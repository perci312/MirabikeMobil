import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historial-cliente',
  templateUrl: './historial-cliente.page.html',
  styleUrls: ['./historial-cliente.page.scss'],
})
export class HistorialClientePage implements OnInit {
  datosAppCliente: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerDatosAppCliente();
  }

  obtenerDatosAppCliente() {
    const apiUrl = 'https://tnlkxyinql.execute-api.us-east-2.amazonaws.com/cliente';

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        const responseBody = JSON.parse(response.body);
        if (Array.isArray(responseBody)) {
          this.datosAppCliente = responseBody;
        } else {
          console.error('Error: Los datos no están en el formato esperado.');
        }
      },
      (error) => {
        console.error('Error al obtener datos de app_cliente:', error);
      }
    );
  }
}






