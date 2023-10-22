import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historial-cliente',
  templateUrl: './historial-cliente.page.html',
  styleUrls: ['./historial-cliente.page.scss'],
})
export class HistorialClientePage implements OnInit {
  datosAppCliente: any[] = []; // Inicializa la propiedad para almacenar los datos

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerDatosAppCliente();
  }

  obtenerDatosAppCliente() {
    const apiUrl = 'https://vd2djqqrt8.execute-api.us-east-2.amazonaws.com/consulta_tablas/conectar_base_datos_mysql/app_cliente';
  
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response.data && Array.isArray(response.data)) {
          this.datosAppCliente = response.data; // Asegúrate de asignarlos a la propiedad correcta (datosAppCliente)
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





