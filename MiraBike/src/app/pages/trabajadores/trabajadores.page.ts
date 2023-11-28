import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.page.html',
  styleUrls: ['./trabajadores.page.scss'],
})
export class TrabajadoresPage implements OnInit {
  datosAppPersona: any[] = [];
  ordenAscendente: boolean = true;
  campoOrdenado: string = 'stock';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerDatosAppPersona();
  }

  obtenerDatosAppPersona() {
    const apiUrl = 'https://0pekvv5h38.execute-api.us-east-2.amazonaws.com/producto'; // Reemplaza con la URL de tu API de AWS Lambda

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

  ordenarDatos(campo: string) {
    this.datosAppPersona.sort((a, b) => {
      const valorA = a[campo];
      const valorB = b[campo];
  
      if (typeof valorA === 'string' && typeof valorB === 'string') {
        return this.ordenAscendente ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
      } else {
        return this.ordenAscendente ? valorA - valorB : valorB - valorA;
      }
    });
  
    // Cambia el estado de ordenamiento para la próxima vez
    this.ordenAscendente = !this.ordenAscendente;
  }
}

