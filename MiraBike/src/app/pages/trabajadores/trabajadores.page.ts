import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.page.html',
  styleUrls: ['./trabajadores.page.scss'],
})
export class TrabajadoresPage implements OnInit {
  datosAppPersona: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerDatosAppPersona();
  }

  obtenerDatosAppPersona() {
    const apiUrl = 'https://5o2imzmocc.execute-api.us-east-2.amazonaws.com/persona'; // Reemplaza con la URL de tu API de AWS Lambda

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        const responseBody = JSON.parse(response.body);
        if (Array.isArray(responseBody)) {
          this.datosAppPersona = responseBody;
        } else {
          console.error('Error: Los datos no están en el formato esperado.');
        }
      },
      (error) => {
        console.error('Error al obtener datos de app_persona:', error);
      }
    );
  }
}

