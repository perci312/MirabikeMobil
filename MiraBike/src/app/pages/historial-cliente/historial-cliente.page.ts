import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historial-cliente',
  templateUrl: './historial-cliente.page.html',
  styleUrls: ['./historial-cliente.page.scss'],
})
export class HistorialClientePage implements OnInit {
  datosAppCliente: any[] = [];
  filteredDatosAppCliente: any[] = [];
  searchRut: string = '';
  

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerDatosAppCliente();
  }

  //Obtener datos de la api
  obtenerDatosAppCliente() {
    const apiUrl = 'https://tnlkxyinql.execute-api.us-east-2.amazonaws.com/cliente';

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        const responseBody = JSON.parse(response.body);
        if (Array.isArray(responseBody)) {
          this.datosAppCliente = responseBody;
          this.filteredDatosAppCliente = this.datosAppCliente; 
        } else {
          console.error('Error: Los datos no están en el formato esperado.');
        }
      },
      (error) => {
        console.error('Error al obtener datos de app_cliente:', error);
      }
    );
  }

  // Método para aplicar el filtro
  filterData() {
    this.filteredDatosAppCliente = this.datosAppCliente.filter((dato) =>
      (dato.rut_cliente || '').toString().startsWith(this.searchRut)
    );
  }
  //resetear
  resetFilters() {
    this.searchRut = ''; 
    this.filteredDatosAppCliente = this.datosAppCliente; 
  }
}















