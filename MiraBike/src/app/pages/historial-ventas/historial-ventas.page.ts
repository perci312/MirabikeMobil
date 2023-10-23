import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historial-ventas',
  templateUrl: './historial-ventas.page.html',
  styleUrls: ['./historial-ventas.page.scss'],
})
export class HistorialVentasPage implements OnInit {
  datosVentas: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerDatosVentas();
  }

  obtenerDatosVentas() {
    const apiUrl = 'https://utgtbwb3r5.execute-api.us-east-2.amazonaws.com/venta';

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        const responseBody = JSON.parse(response.body);
        if (Array.isArray(responseBody)) {
          this.datosVentas = responseBody;
        } else {
          console.error('Error: Los datos no están en el formato esperado.');
        }
      },
      (error) => {
        console.error('Error al obtener datos de ventas:', error);
      }
    );
  }
}
